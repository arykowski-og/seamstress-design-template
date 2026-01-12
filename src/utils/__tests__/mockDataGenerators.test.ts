/**
 * Tests for mock data generators
 */

import {
  generateAgent,
  generateSkill,
  generateTool,
  generateKnowledgeDocument,
  generateBulkData,
  generateCompleteDataset,
  generateFilteredData
} from '../mockDataGenerators';
import type { OGAgent, OGSkill, OGTool, OGKnowledgeDocument } from '../../types/opengov';

describe('generateAgent', () => {
  it('generates a valid agent with all required fields', () => {
    const agent = generateAgent();

    expect(agent).toHaveProperty('id');
    expect(agent).toHaveProperty('name');
    expect(agent).toHaveProperty('summary');
    expect(agent).toHaveProperty('status');
    expect(agent).toHaveProperty('category');
    expect(agent).toHaveProperty('createdBy');
    expect(agent).toHaveProperty('createdAt');
    expect(agent).toHaveProperty('updatedAt');
    expect(agent).toHaveProperty('activity');
    expect(agent).toHaveProperty('tags');
    expect(agent).toHaveProperty('skills');
  });

  it('respects override values', () => {
    const overrides: Partial<OGAgent> = {
      name: 'Custom Agent',
      status: 'published',
      category: 'Custom Category'
    };

    const agent = generateAgent(overrides);

    expect(agent.name).toBe('Custom Agent');
    expect(agent.status).toBe('published');
    expect(agent.category).toBe('Custom Category');
  });

  it('generates valid status values', () => {
    const validStatuses = ['published', 'draft', 'archived'];
    const agent = generateAgent();

    expect(validStatuses).toContain(agent.status);
  });

  it('generates valid timestamps', () => {
    const agent = generateAgent();
    const createdAt = new Date(agent.createdAt);
    const updatedAt = new Date(agent.updatedAt);

    expect(createdAt).toBeInstanceOf(Date);
    expect(updatedAt).toBeInstanceOf(Date);
    expect(updatedAt >= createdAt).toBe(true);
  });

  it('generates activity metrics within expected ranges', () => {
    const agent = generateAgent();

    expect(agent.activity.actions).toBeGreaterThanOrEqual(0);
    expect(agent.activity.actions).toBeLessThanOrEqual(2000);
    expect(agent.activity.uniqueUsers).toBeGreaterThanOrEqual(1);
    expect(agent.activity.uniqueUsers).toBeLessThanOrEqual(100);
  });
});

describe('generateSkill', () => {
  it('generates a valid skill with all required fields', () => {
    const skill = generateSkill();

    expect(skill).toHaveProperty('id');
    expect(skill).toHaveProperty('name');
    expect(skill).toHaveProperty('description');
    expect(skill).toHaveProperty('category');
    expect(skill).toHaveProperty('status');
    expect(skill).toHaveProperty('parameters');
    expect(skill).toHaveProperty('examples');
    expect(skill).toHaveProperty('usage');
  });

  it('generates valid parameters', () => {
    const skill = generateSkill();

    expect(Array.isArray(skill.parameters)).toBe(true);
    skill.parameters?.forEach(param => {
      expect(param).toHaveProperty('name');
      expect(param).toHaveProperty('type');
      expect(param).toHaveProperty('required');
      expect(param).toHaveProperty('description');
      expect(['string', 'number', 'boolean', 'object', 'array']).toContain(param.type);
    });
  });

  it('generates usage metrics within expected ranges', () => {
    const skill = generateSkill();

    expect(skill.usage.count).toBeGreaterThanOrEqual(10);
    expect(skill.usage.count).toBeLessThanOrEqual(5000);
    expect(skill.usage.successRate).toBeGreaterThanOrEqual(85);
    expect(skill.usage.successRate).toBeLessThanOrEqual(100);
    expect(skill.usage.avgResponseTime).toBeGreaterThanOrEqual(0.5);
    expect(skill.usage.avgResponseTime).toBeLessThanOrEqual(5.0);
  });

  it('generates examples array', () => {
    const skill = generateSkill();

    expect(Array.isArray(skill.examples)).toBe(true);
    expect(skill.examples?.length).toBeGreaterThanOrEqual(2);
    expect(skill.examples?.length).toBeLessThanOrEqual(4);
  });
});

describe('generateTool', () => {
  it('generates a valid tool with all required fields', () => {
    const tool = generateTool();

    expect(tool).toHaveProperty('id');
    expect(tool).toHaveProperty('name');
    expect(tool).toHaveProperty('description');
    expect(tool).toHaveProperty('category');
    expect(tool).toHaveProperty('type');
    expect(tool).toHaveProperty('status');
    expect(tool).toHaveProperty('endpoint');
    expect(tool).toHaveProperty('authentication');
    expect(tool).toHaveProperty('parameters');
    expect(tool).toHaveProperty('responses');
    expect(tool).toHaveProperty('usage');
  });

  it('generates valid tool types', () => {
    const validTypes = ['api', 'database', 'file', 'integration', 'utility'];
    const tool = generateTool();

    expect(validTypes).toContain(tool.type);
  });

  it('generates valid authentication configurations', () => {
    const tool = generateTool();
    const validAuthTypes = ['none', 'apiKey', 'oauth2', 'basic'];

    expect(tool.authentication).toHaveProperty('type');
    expect(validAuthTypes).toContain(tool.authentication?.type);
  });

  it('generates valid parameters', () => {
    const tool = generateTool();

    expect(Array.isArray(tool.parameters)).toBe(true);
    tool.parameters?.forEach(param => {
      expect(param).toHaveProperty('name');
      expect(param).toHaveProperty('in');
      expect(param).toHaveProperty('type');
      expect(param).toHaveProperty('required');
      expect(['query', 'path', 'header', 'body']).toContain(param.in);
    });
  });

  it('generates standard HTTP responses', () => {
    const tool = generateTool();

    expect(Array.isArray(tool.responses)).toBe(true);
    expect(tool.responses?.length).toBeGreaterThan(0);
    expect(tool.responses?.some(r => r.status === 200)).toBe(true);
  });
});

describe('generateKnowledgeDocument', () => {
  it('generates a valid document with all required fields', () => {
    const doc = generateKnowledgeDocument();

    expect(doc).toHaveProperty('id');
    expect(doc).toHaveProperty('title');
    expect(doc).toHaveProperty('content');
    expect(doc).toHaveProperty('type');
    expect(doc).toHaveProperty('size');
    expect(doc).toHaveProperty('mimeType');
    expect(doc).toHaveProperty('status');
    expect(doc).toHaveProperty('metadata');
    expect(doc).toHaveProperty('analytics');
  });

  it('generates valid document types with correct mime types', () => {
    const validTypes = ['pdf', 'csv', 'excel', 'txt', 'markdown', 'word', 'html'];
    const doc = generateKnowledgeDocument();

    expect(validTypes).toContain(doc.type);
    expect(doc.mimeType).toBeTruthy();
  });

  it('generates realistic file sizes', () => {
    const doc = generateKnowledgeDocument();

    expect(doc.size).toBeGreaterThanOrEqual(1024); // At least 1KB
    expect(doc.size).toBeLessThanOrEqual(10485760); // Max 10MB
  });

  it('generates valid analytics data', () => {
    const doc = generateKnowledgeDocument();

    expect(doc.analytics?.views).toBeGreaterThanOrEqual(10);
    expect(doc.analytics?.downloads).toBeGreaterThanOrEqual(0);
    expect(doc.analytics?.shares).toBeGreaterThanOrEqual(0);
    expect(doc.analytics?.downloads).toBeLessThanOrEqual(doc.analytics?.views || 0);
  });
});

describe('generateBulkData', () => {
  it('generates specified number of items', () => {
    const count = 5;
    const agents = generateBulkData(generateAgent, count);

    expect(agents).toHaveLength(count);
    agents.forEach(agent => {
      expect(agent).toHaveProperty('id');
      expect(agent).toHaveProperty('name');
    });
  });

  it('applies overrides to all generated items', () => {
    const overrides: Partial<OGAgent> = {
      status: 'published',
      category: 'Test Category'
    };

    const agents = generateBulkData(generateAgent, 3, overrides);

    agents.forEach(agent => {
      expect(agent.status).toBe('published');
      expect(agent.category).toBe('Test Category');
    });
  });

  it('generates unique IDs for each item', () => {
    const agents = generateBulkData(generateAgent, 10);
    const ids = agents.map(a => a.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(agents.length);
  });
});

describe('generateCompleteDataset', () => {
  it('generates a complete dataset with all entity types', () => {
    const dataset = generateCompleteDataset();

    expect(dataset).toHaveProperty('agents');
    expect(dataset).toHaveProperty('skills');
    expect(dataset).toHaveProperty('tools');
    expect(dataset).toHaveProperty('documents');
  });

  it('generates expected number of items for each type', () => {
    const dataset = generateCompleteDataset();

    expect(dataset.agents).toHaveLength(20);
    expect(dataset.skills).toHaveLength(30);
    expect(dataset.tools).toHaveLength(25);
    expect(dataset.documents).toHaveLength(50);
  });

  it('generates valid data for all entities', () => {
    const dataset = generateCompleteDataset();

    dataset.agents.forEach(agent => {
      expect(agent).toHaveProperty('id');
      expect(agent).toHaveProperty('name');
    });

    dataset.skills.forEach(skill => {
      expect(skill).toHaveProperty('id');
      expect(skill).toHaveProperty('description');
    });

    dataset.tools.forEach(tool => {
      expect(tool).toHaveProperty('id');
      expect(tool).toHaveProperty('type');
    });

    dataset.documents.forEach(doc => {
      expect(doc).toHaveProperty('id');
      expect(doc).toHaveProperty('title');
    });
  });
});

describe('generateFilteredData', () => {
  it('generates data with specified filter criteria', () => {
    const filter: Partial<OGAgent> = {
      status: 'published',
      category: 'Finance'
    };

    const agents = generateFilteredData(generateAgent, 5, filter);

    agents.forEach(agent => {
      expect(agent.status).toBe('published');
      expect(agent.category).toBe('Finance');
    });
  });

  it('maintains other random properties while applying filter', () => {
    const filter: Partial<OGSkill> = {
      status: 'draft'
    };

    const skills = generateFilteredData(generateSkill, 3, filter);

    skills.forEach(skill => {
      expect(skill.status).toBe('draft');
      // Other properties should still be randomly generated
      expect(skill.name).toBeTruthy();
      expect(skill.description).toBeTruthy();
      expect(skill.category).toBeTruthy();
    });

    // Names should be different (random)
    const names = new Set(skills.map(s => s.name));
    expect(names.size).toBeGreaterThan(1);
  });
});