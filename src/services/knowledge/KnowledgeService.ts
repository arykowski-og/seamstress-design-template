/**
 * Knowledge Service
 * Core service for knowledge management operations
 */

import type {
  KnowledgeDocument,
  DocumentReference,
  MentionSuggestion,
  SearchResult,
  KnowledgeContext,
  DocumentVersion,
  KnowledgeStats,
  ReferenceType
} from './KnowledgeTypes';
import { MENTION_PATTERNS } from './KnowledgeTypes';
import { knowledgeStorage } from './KnowledgeStorage';
import { knowledgeIndex } from './KnowledgeIndex';
import { fileUploadService } from './FileUploadService';
import { getAllAgents } from '../agents/agentTypes';
import { exampleDocuments } from './ExampleDocuments';
import { getCurrentUserId } from '../../contexts/AuthContext';

// Simple UUID v4 generator
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export class KnowledgeService {
  private get currentUser() {
    return getCurrentUserId();
  }
  private recentDocuments: KnowledgeDocument[] = [];
  private documentCache = new Map<string, KnowledgeDocument>();
  private initialized = false;

  // Initialize example documents on first load
  private async initializeExampleDocuments(): Promise<void> {
    if (this.initialized) return;

    try {
      const existingDocs = await knowledgeStorage.getAllDocuments();

      // Check if example documents already exist by title
      const existingTitles = new Set(existingDocs.map(doc => doc.title));
      const exampleTitles = [
        'AI Agent Architecture Guidelines',
        'Government Data Processing Compliance Framework',
        'Skill Development Lifecycle and Best Practices'
      ];

      const needsExamples = exampleTitles.some(title => !existingTitles.has(title));

      // Add example documents if any are missing
      if (needsExamples) {
        for (const docData of exampleDocuments) {
          if (!existingTitles.has(docData.title)) {
            const doc: KnowledgeDocument = {
              ...docData,
              id: uuidv4(),
              searchableContent: docData.content,
            };
            await knowledgeStorage.saveDocument(doc);
            await knowledgeIndex.indexDocument(doc);
            // Added example document
          }
        }
      }

      this.initialized = true;
    } catch (error) {
      // Failed to initialize example documents
    }
  }

  // Document CRUD operations
  async createDocument(
    title: string,
    content: string,
    type: KnowledgeDocument['type'] = 'markdown',
    tags: string[] = []
  ): Promise<KnowledgeDocument> {
    const now = new Date();
    const document: KnowledgeDocument = {
      id: uuidv4(),
      title,
      content,
      type,
      metadata: {
        author: this.currentUser,
        created: now,
        modified: now,
        tags,
        references: this.extractReferences(content),
        referencedBy: [],
        version: 1,
      },
      permissions: {
        owner: this.currentUser,
        public: false,
        sharedWith: [],
        canEdit: [this.currentUser],
        canView: [this.currentUser],
      },
      searchableContent: content,
      publishingStatus: 'draft',
    };

    await knowledgeStorage.saveDocument(document);
    await knowledgeIndex.indexDocument(document);
    this.documentCache.set(document.id, document);
    
    // Create initial version
    await this.createVersion(document);
    
    return document;
  }

  async updateDocument(
    id: string,
    updates: Partial<Pick<KnowledgeDocument, 'title' | 'content' | 'tags'>>
  ): Promise<KnowledgeDocument> {
    const document = await this.getDocument(id);
    if (!document) {
      throw new Error('Document not found');
    }

    // Check permissions
    if (!document.permissions.canEdit.includes(this.currentUser)) {
      throw new Error('Permission denied');
    }

    // Update document
    const updatedDocument: KnowledgeDocument = {
      ...document,
      title: updates.title ?? document.title,
      content: updates.content ?? document.content,
      metadata: {
        ...document.metadata,
        modified: new Date(),
        tags: updates.tags ?? document.metadata.tags,
        references: updates.content 
          ? this.extractReferences(updates.content)
          : document.metadata.references,
        version: document.metadata.version + 1,
      },
      searchableContent: updates.content ?? document.searchableContent,
    };

    await knowledgeStorage.saveDocument(updatedDocument);
    await knowledgeIndex.updateDocument(updatedDocument);
    this.documentCache.set(id, updatedDocument);
    
    // Create new version
    await this.createVersion(updatedDocument);
    
    return updatedDocument;
  }

  async getDocument(id: string): Promise<KnowledgeDocument | null> {
    // Check cache first
    if (this.documentCache.has(id)) {
      return this.documentCache.get(id)!;
    }

    const document = await knowledgeStorage.getDocument(id);
    if (document) {
      this.documentCache.set(id, document);
      this.addToRecent(document);
    }
    return document;
  }

  async deleteDocument(id: string): Promise<void> {
    const document = await this.getDocument(id);
    if (!document) {
      throw new Error('Document not found');
    }

    // Check permissions
    if (document.permissions.owner !== this.currentUser) {
      throw new Error('Permission denied');
    }

    await knowledgeStorage.deleteDocument(id);
    await knowledgeIndex.removeDocument(id);
    this.documentCache.delete(id);
  }

  async publishDocument(id: string): Promise<KnowledgeDocument> {
    const document = await this.getDocument(id);
    if (!document) {
      throw new Error('Document not found');
    }

    const updatedDocument: KnowledgeDocument = {
      ...document,
      publishingStatus: 'published',
      metadata: {
        ...document.metadata,
        modified: new Date(),
      },
    };

    await knowledgeStorage.saveDocument(updatedDocument);
    this.documentCache.set(id, updatedDocument);
    return updatedDocument;
  }

  async unpublishDocument(id: string): Promise<KnowledgeDocument> {
    const document = await this.getDocument(id);
    if (!document) {
      throw new Error('Document not found');
    }

    const updatedDocument: KnowledgeDocument = {
      ...document,
      publishingStatus: 'draft',
      metadata: {
        ...document.metadata,
        modified: new Date(),
      },
    };

    await knowledgeStorage.saveDocument(updatedDocument);
    this.documentCache.set(id, updatedDocument);
    return updatedDocument;
  }

  // Search and retrieval
  async searchDocuments(query: string): Promise<SearchResult[]> {
    const results = await knowledgeIndex.search(query);
    return results;
  }

  async getAllDocuments(): Promise<KnowledgeDocument[]> {
    await this.initializeExampleDocuments();
    return await knowledgeStorage.getAllDocuments();
  }

  async getDocumentsByType(type: KnowledgeDocument['type']): Promise<KnowledgeDocument[]> {
    return await knowledgeStorage.getDocumentsByType(type);
  }

  async getDocumentsByTag(tag: string): Promise<KnowledgeDocument[]> {
    return await knowledgeStorage.getDocumentsByTag(tag);
  }

  // @ Mention support
  async getMentionSuggestions(query: string): Promise<MentionSuggestion[]> {
    const suggestions: MentionSuggestion[] = [];

    // Check for specific patterns
    if (query.startsWith('@seamstress/')) {
      // System commands and contexts
      suggestions.push(
        {
          id: 'seamstress-contexts',
          type: 'knowledge',
          label: '@seamstress/contexts',
          description: 'System context documents',
          icon: '📁',
          path: '@seamstress/contexts',
        },
        {
          id: 'seamstress-templates',
          type: 'knowledge',
          label: '@seamstress/templates',
          description: 'Document templates',
          icon: '📄',
          path: '@seamstress/templates',
        },
        {
          id: 'seamstress-help',
          type: 'knowledge',
          label: '@seamstress/help',
          description: 'Help and documentation',
          icon: '❓',
          path: '@seamstress/help',
        }
      );
    } else if (query.startsWith('@knowledge/')) {
      // Knowledge documents
      const searchQuery = query.replace('@knowledge/', '');
      const documents = await this.searchDocuments(searchQuery);
      
      documents.slice(0, 10).forEach(result => {
        suggestions.push({
          id: result.document.id,
          type: 'knowledge',
          label: `@knowledge/${result.document.title}`,
          description: result.document.metadata.tags.join(', '),
          icon: '📄',
          path: `@knowledge/${result.document.id}`,
          metadata: result.document,
        });
      });
    } else if (query.startsWith('@agent/')) {
      // Agents
      const agents = getAllAgents();
      const searchQuery = query.replace('@agent/', '').toLowerCase();
      
      agents
        .filter(agent => agent.name.toLowerCase().includes(searchQuery))
        .forEach(agent => {
          suggestions.push({
            id: agent.id,
            type: 'agent',
            label: `@agent/${agent.name}`,
            description: agent.description,
            icon: '🤖',
            color: agent.color,
            path: `@agent/${agent.id}`,
            metadata: agent,
          });
        });
    } else if (query.startsWith('@skill/')) {
      // Skills - would integrate with skill service
      suggestions.push({
        id: 'skill-example',
        type: 'skill',
        label: '@skill/data-analysis',
        description: 'Data analysis and visualization',
        icon: '💡',
        path: '@skill/data-analysis',
      });
    } else if (query.startsWith('@tool/')) {
      // Tools
      suggestions.push({
        id: 'tool-example',
        type: 'tool',
        label: '@tool/calculator',
        description: 'Basic calculator functions',
        icon: '🔧',
        path: '@tool/calculator',
      });
    } else if (query.startsWith('@')) {
      // Show all categories
      suggestions.push(
        {
          id: 'mention-knowledge',
          type: 'knowledge',
          label: '@knowledge/',
          description: 'Reference knowledge documents',
          icon: '📚',
        },
        {
          id: 'mention-agent',
          type: 'agent',
          label: '@agent/',
          description: 'Reference AI agents',
          icon: '🤖',
        },
        {
          id: 'mention-skill',
          type: 'skill',
          label: '@skill/',
          description: 'Reference skills',
          icon: '💡',
        },
        {
          id: 'mention-tool',
          type: 'tool',
          label: '@tool/',
          description: 'Reference tools',
          icon: '🔧',
        },
        {
          id: 'mention-seamstress',
          type: 'knowledge',
          label: '@seamstress/',
          description: 'System commands and contexts',
          icon: '⚙️',
        }
      );
    }

    return suggestions;
  }

  // Reference extraction and resolution
  private extractReferences(content: string): DocumentReference[] {
    const references: DocumentReference[] = [];
    
    // Extract all @ mentions
    const mentionRegex = /@(\w+)\/([\w\-\/]+)/g;
    let match;
    
    while ((match = mentionRegex.exec(content)) !== null) {
      const type = match[1] as ReferenceType;
      const entityId = match[2];
      
      if (['knowledge', 'agent', 'skill', 'tool'].includes(type)) {
        references.push({
          id: uuidv4(),
          type,
          entityId,
          entityName: entityId, // Will be resolved later
          position: {
            start: match.index,
            end: match.index + match[0].length,
          },
          context: content.substring(
            Math.max(0, match.index - 50),
            Math.min(content.length, match.index + match[0].length + 50)
          ),
        });
      }
    }
    
    return references;
  }

  async resolveReference(reference: DocumentReference): Promise<any> {
    switch (reference.type) {
      case 'knowledge':
        return await this.getDocument(reference.entityId);
      case 'agent':
        // Would integrate with agent service
        return getAllAgents().find(a => a.id === reference.entityId);
      case 'skill':
        // Would integrate with skill service
        return null;
      case 'tool':
        // Would integrate with tool service
        return null;
      default:
        return null;
    }
  }


  // Version control
  private async createVersion(document: KnowledgeDocument): Promise<void> {
    const version: DocumentVersion = {
      id: uuidv4(),
      version: document.metadata.version,
      content: document.content,
      metadata: document.metadata,
      created: new Date(),
      author: this.currentUser,
    };

    await knowledgeStorage.saveVersion(version);
  }

  async getVersionHistory(documentId: string): Promise<DocumentVersion[]> {
    return await knowledgeStorage.getVersionHistory(documentId);
  }

  async restoreVersion(documentId: string, versionId: string): Promise<KnowledgeDocument> {
    const versions = await this.getVersionHistory(documentId);
    const version = versions.find(v => v.id === versionId);
    
    if (!version) {
      throw new Error('Version not found');
    }

    const document = await this.getDocument(documentId);
    if (!document) {
      throw new Error('Document not found');
    }

    return await this.updateDocument(documentId, {
      content: version.content,
      title: document.title, // Keep current title
      tags: version.metadata.tags,
    });
  }

  // Helper method to get most referenced documents
  private async getMostReferencedDocuments(limit: number = 5): Promise<string[]> {
    const documents = await this.getAllDocuments();

    // Count references for each document
    const referenceCounts = new Map<string, number>();
    documents.forEach(doc => {
      const refCount = doc.metadata.referencedBy?.length || 0;
      if (refCount > 0) {
        referenceCounts.set(doc.id, refCount);
      }
    });

    // Sort by reference count and return top N
    const sorted = Array.from(referenceCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => id);

    return sorted;
  }

  // Context and statistics
  async getKnowledgeContext(documentId?: string): Promise<KnowledgeContext> {
    const currentDocument = documentId ? await this.getDocument(documentId) : undefined;
    const relatedDocuments: KnowledgeDocument[] = [];
    
    if (currentDocument) {
      // Find documents with similar tags
      for (const tag of currentDocument.metadata.tags) {
        const docs = await this.getDocumentsByTag(tag);
        docs.forEach(doc => {
          if (doc.id !== documentId && !relatedDocuments.find(d => d.id === doc.id)) {
            relatedDocuments.push(doc);
          }
        });
      }
    }

    return {
      currentDocument,
      recentDocuments: this.recentDocuments,
      relatedDocuments: relatedDocuments.slice(0, 5),
      activeReferences: currentDocument?.metadata.references || [],
    };
  }

  async getStats(): Promise<KnowledgeStats> {
    const documents = await this.getAllDocuments();
    const documentsByType: Record<string, number> = {};
    let totalSize = 0;

    documents.forEach(doc => {
      documentsByType[doc.type] = (documentsByType[doc.type] || 0) + 1;
      totalSize += doc.metadata.size || 0;
    });

    return {
      totalDocuments: documents.length,
      documentsByType: documentsByType as any,
      totalSize,
      lastUpdated: new Date(),
      mostReferenced: await this.getMostReferencedDocuments(5),
      recentlyViewed: this.recentDocuments.map(d => d.id),
    };
  }

  private addToRecent(document: KnowledgeDocument): void {
    this.recentDocuments = [
      document,
      ...this.recentDocuments.filter(d => d.id !== document.id),
    ].slice(0, 10);
  }

  // File upload integration
  async uploadFile(file: File): Promise<KnowledgeDocument> {
    const result = await fileUploadService.uploadFile(file);

    if (!result.success) {
      throw new Error(result.error || 'Upload failed');
    }

    const docType = result.metadata?.type as DocumentType | undefined;
    const document = await this.createDocument(
      file.name,
      result.extractedContent || '',
      docType || 'txt',
      []
    );

    // Update document with original file if it was preserved
    if (result.originalFile && result.originalFileName) {
      const updatedDocument: KnowledgeDocument = {
        ...document,
        originalFile: result.originalFile,
        originalFileName: result.originalFileName,
      };

      await knowledgeStorage.saveDocument(updatedDocument);
      this.documentCache.set(updatedDocument.id, updatedDocument);

      return updatedDocument;
    }

    return document;
  }
}

export const knowledgeService = new KnowledgeService();