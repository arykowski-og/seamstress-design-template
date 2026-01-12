import React, { useState, useEffect, useRef } from 'react';
import { Box, Stack, Chip, Typography, IconButton, CircularProgress, Fade, Grow } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { EAMCardRenderer } from './EAMCardRenderer';
import { InspectionCardRenderer } from '../InspectionScheduler';
import { GenUXMessageRenderer } from './GenUXMessageRenderer';
import { ChatVisualization } from './ChatVisualization';
import { renderContentWithCitations } from './KnowledgeCitation';
import { FeedbackDialog, FeedbackToast } from './FeedbackDialog';
import type { FeedbackType, FeedbackData } from './FeedbackDialog';
import { FeedbackCard } from './cards/FeedbackCard';
import type { Conversation, Message } from '@opengov/components-ai-patterns';

interface OGAssistConversationProps {
  conversation: Conversation;
  isLoading: boolean;
  thinkingMessage?: string;
  onMessageCopy?: (message: Message) => void;
  customActionItems?: (message: Message) => React.ReactNode[];
  showCopyButton?: (message: Message) => boolean;
  onCardAction?: (action: string, data?: any) => void;
}

// Component for scrambling text animation
const ScrambleText: React.FC<{ text: string; maxLength?: number }> = ({ text, maxLength }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const prevTextRef = useRef(text);
  const fixedLength = maxLength || text.length;

  useEffect(() => {
    if (text === prevTextRef.current) return;

    setIsScrambling(true);
    const targetText = text.padEnd(fixedLength, ' ');
    const sourceText = prevTextRef.current.padEnd(fixedLength, ' ');
    let frame = 0;
    const totalFrames = 55; // Total animation frames (added 20 frames for hold)
    const scrambleFrames = 10; // Frames to scramble
    const revealFrames = 25; // Frames to reveal
    const holdFrames = 20; // Frames to hold the revealed text (2 seconds at 100ms)

    const interval = setInterval(() => {
      let result = '';

      if (frame < scrambleFrames) {
        // Scrambling phase - only scramble 4 random positions
        const scramblePositions = new Set<number>();
        while (scramblePositions.size < 4) {
          const pos = Math.floor(Math.random() * Math.min(sourceText.trim().length, fixedLength));
          if (sourceText[pos] !== ' ') {
            scramblePositions.add(pos);
          }
        }

        for (let i = 0; i < fixedLength; i++) {
          if (scramblePositions.has(i)) {
            result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          } else {
            result += sourceText[i];
          }
        }
      } else if (frame < scrambleFrames + revealFrames) {
        // Unscrambling phase - progressively reveal target text
        const progress = (frame - scrambleFrames) / revealFrames;
        const revealedChars = Math.floor(fixedLength * progress);

        for (let i = 0; i < fixedLength; i++) {
          if (i < revealedChars) {
            // Show actual character
            result += targetText[i];
          } else if (targetText[i] === ' ') {
            // Preserve spaces
            result += ' ';
          } else if (i < sourceText.trim().length && Math.random() < 0.3) {
            // Only scramble 30% of unrevealed characters
            result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          } else {
            result += sourceText[i];
          }
        }
      } else if (frame < scrambleFrames + revealFrames + holdFrames) {
        // Hold phase - show the complete text for 2 seconds
        result = text;
      } else {
        // Animation complete
        result = text;
        clearInterval(interval);
        setIsScrambling(false);
      }

      setDisplayText(result);
      frame++;
    }, 100); // 100ms per frame = MUCH slower letter switching (10 fps)

    prevTextRef.current = text;

    return () => clearInterval(interval);
  }, [text, scrambleChars, fixedLength]);

  return <span>{displayText}</span>;
};

// Component for simulated tool call indicators
const ToolCallIndicator: React.FC<{ thinkingMessage?: string }> = ({ thinkingMessage }) => {
  const [showTools, setShowTools] = useState<string[]>([]);
  const toolsRef = useRef<string[]>([]);

  useEffect(() => {
    if (!thinkingMessage) {
      setShowTools([]);
      toolsRef.current = [];
      return;
    }

    // Map thinking messages to tool calls
    const toolMap: Record<string, string[]> = {
      'Analyzing request': ['parse_request'],
      'Evaluating crew availability': ['query_database', 'check_schedules'],
      'Checking work zones': ['get_zone_data', 'check_permits'],
      'Reviewing schedule conflicts': ['analyze_conflicts', 'find_alternatives'],
      'Matching skills to tasks': ['match_skills', 'assign_crews'],
      'Optimizing assignments': ['optimize_routes', 'balance_workload'],
      'Finalizing schedule': ['save_schedule', 'send_notifications'],
      'Understanding your question': ['nlp_parse'],
      'Searching knowledge base': ['search_docs', 'rank_results'],
      'Analyzing relevant data': ['data_analysis', 'extract_insights'],
      'Formulating response': ['generate_answer'],
      'Preparing insights': ['format_response'],
    };

    // Find matching tools for current message
    const messageKey = Object.keys(toolMap).find(key =>
      thinkingMessage?.includes(key.replace('...', ''))
    );

    if (messageKey && toolMap[messageKey]) {
      const newTools = toolMap[messageKey];
      // Add tools progressively
      newTools.forEach((tool, index) => {
        if (!toolsRef.current.includes(tool)) {
          setTimeout(() => {
            toolsRef.current.push(tool);
            setShowTools([...toolsRef.current]);
          }, index * 500);
        }
      });
    }
  }, [thinkingMessage]);

  if (showTools.length === 0) return null;

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
      {showTools.map((tool, index) => (
        <Fade key={tool} in={true} timeout={400}>
          <Chip
            label={tool}
            size="small"
            variant="outlined"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              fontSize: '11px',
              height: '22px',
            }}
          />
        </Fade>
      ))}
    </Stack>
  );
};

// Component for streaming text effect with citation support
const StreamingText: React.FC<{
  content: string;
  isStreaming: boolean;
  speed?: number;
  renderWithCitations?: boolean;
}> = ({ content, isStreaming, speed = 20, renderWithCitations = false }) => {
  const [displayedContent, setDisplayedContent] = useState(isStreaming ? '' : content);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedContent(content);
      return;
    }

    // Reset for new content
    indexRef.current = 0;
    setDisplayedContent('');

    const streamContent = () => {
      if (indexRef.current < content.length) {
        const chunkSize = Math.min(3, content.length - indexRef.current);
        const nextChunk = content.substring(indexRef.current, indexRef.current + chunkSize);
        indexRef.current += chunkSize;
        setDisplayedContent(prev => prev + nextChunk);
      }
    };

    const interval = setInterval(streamContent, speed);

    return () => clearInterval(interval);
  }, [content, isStreaming, speed]);

  // Render with citations if requested
  if (renderWithCitations && !isStreaming) {
    return <>{renderContentWithCitations(displayedContent)}</>;
  }

  return <>{displayedContent}</>;
};

export const OGAssistConversation: React.FC<OGAssistConversationProps> = ({
  conversation,
  isLoading,
  thinkingMessage,
  onMessageCopy,
  customActionItems,
  showCopyButton = () => true,
  onCardAction,
}) => {
  const [feedbackDialog, setFeedbackDialog] = useState<{
    open: boolean;
    type: FeedbackType;
    message: Message | null;
  }>({
    open: false,
    type: 'positive',
    message: null,
  });
  const [showToast, setShowToast] = useState(false);
  const [messageFeedback, setMessageFeedback] = useState<Map<number, FeedbackType>>(new Map());
  const [feedbackCardIndex, setFeedbackCardIndex] = useState<number | null>(null);
  const [feedbackCardType, setFeedbackCardType] = useState<'positive' | 'negative' | null>(null);

  // Track which messages have been displayed
  const [displayedMessages, setDisplayedMessages] = useState<Set<number>>(new Set());
  const [streamingMessageIndex, setStreamingMessageIndex] = useState<number | null>(null);
  const [showChips, setShowChips] = useState<Map<number, boolean>>(new Map());
  const [showTitle, setShowTitle] = useState<Map<number, boolean>>(new Map());
  const [showContent, setShowContent] = useState<Map<number, boolean>>(new Map());
  const prevMessageCountRef = useRef(0);

  // Progressive reveal of new messages
  useEffect(() => {
    if (conversation.messages.length > prevMessageCountRef.current) {
      const newMessageIndex = conversation.messages.length - 1;
      const newMessage = conversation.messages[newMessageIndex];

      if (newMessage.role === 'assistant') {
        // Start progressive reveal
        setTimeout(() => {
          // Show chips first
          setShowChips(prev => new Map(prev).set(newMessageIndex, true));

          // Show title after 400ms
          setTimeout(() => {
            setShowTitle(prev => new Map(prev).set(newMessageIndex, true));

            // Start content streaming after 600ms
            setTimeout(() => {
              setShowContent(prev => new Map(prev).set(newMessageIndex, true));
              setStreamingMessageIndex(newMessageIndex);

              // Stop streaming after content is fully displayed
              const contentLength = (newMessage.content || '').length;
              const streamDuration = (contentLength / 3) * 20; // Based on chunk size and speed
              setTimeout(() => {
                setStreamingMessageIndex(null);
                setDisplayedMessages(prev => new Set(prev).add(newMessageIndex));
              }, streamDuration + 500);
            }, 600);
          }, 400);
        }, 100);
      } else {
        // User messages appear immediately
        setDisplayedMessages(prev => new Set(prev).add(newMessageIndex));
      }

      prevMessageCountRef.current = conversation.messages.length;
    }
  }, [conversation.messages]);

  const handleCopy = (message: Message) => {
    navigator.clipboard.writeText(message.content || '');
    onMessageCopy?.(message);
  };

  const handleThumbsUp = (message: Message, index: number) => {
    // Show feedback card inline instead of dialog
    setFeedbackCardIndex(index);
    setFeedbackCardType('positive');
  };

  const handleThumbsDown = (message: Message, index: number) => {
    // Show feedback card inline instead of dialog
    setFeedbackCardIndex(index);
    setFeedbackCardType('negative');
  };

  const handleFeedbackCardSubmit = (feedback: string, tags: string[]) => {
    console.log('Feedback submitted:', {
      messageIndex: feedbackCardIndex,
      type: feedbackCardType,
      feedback,
      tags,
    });

    // Track which message received feedback
    if (feedbackCardIndex !== null && feedbackCardType) {
      setMessageFeedback(prev => new Map(prev).set(
        feedbackCardIndex,
        feedbackCardType === 'positive' ? 'positive' : 'negative'
      ));
    }

    // Show success toast
    setShowToast(true);

    // Close feedback card
    setFeedbackCardIndex(null);
    setFeedbackCardType(null);
  };

  const handleFeedbackCardClose = () => {
    setFeedbackCardIndex(null);
    setFeedbackCardType(null);
  };

  const handleFeedbackSubmit = (feedback: FeedbackData) => {
    // Track which message received feedback
    if (feedbackDialog.message) {
      const messageIndex = (feedbackDialog.message as any).index;
      setMessageFeedback(prev => new Map(prev).set(messageIndex, feedback.type));
    }

    // Here you would typically send the feedback to your backend
    // For now, just log it and show a toast

    setFeedbackDialog({
      open: false,
      type: 'positive',
      message: null,
    });
    setShowToast(true);
  };

  const handleFeedbackClose = () => {
    setFeedbackDialog({
      open: false,
      type: 'positive',
      message: null,
    });
  };

  // Extract title from content (first line after ##)
  const getTitle = (content: string, message: Message): string => {
    const lines = content.split('\n');
    const titleLine = lines.find(line => line.startsWith('## '));

    if (titleLine) {
      return titleLine.replace('## ', '');
    }

    // Fallback: Use skill name if available, otherwise extract first meaningful line
    const metadata = (message as any).metadata;
    if (metadata?.skillName) {
      return metadata.skillName;
    }

    // Try to extract first non-empty line as title
    const firstLine = lines.find(line => line.trim().length > 0);
    if (firstLine && firstLine.length < 80) {
      return firstLine.trim();
    }

    return 'Response';
  };

  // Remove title from content
  const getContentWithoutTitle = (content: string): string => {
    const lines = content.split('\n');
    const titleIndex = lines.findIndex(line => line.startsWith('## '));
    if (titleIndex !== -1) {
      lines.splice(titleIndex, 1);
    }
    return lines.join('\n').trim();
  };

  return (
    <Stack spacing={3} sx={{ py: 2 }}>
      {conversation.messages.map((message, index) => (
        <Box key={`msg-${index}`} sx={{ flexShrink: 0, display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
          {message.role === 'user' ? (
            // User message - simple rendering
            <Box sx={{
              bgcolor: 'action.hover',
              borderRadius: 2,
              px: 2,
              py: 1.5,
              maxWidth: '80%',
              width: 'fit-content',
            }}>
              <Typography variant="body1">{message.content}</Typography>
            </Box>
          ) : (
            // Assistant message with full formatting
            <Box>
              {/* Agent and Skill Chips with sequential animation */}
              <Grow in={showChips.get(index) || displayedMessages.has(index)} timeout={300}>
                <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                  <Fade in={showChips.get(index) || displayedMessages.has(index)} timeout={400}>
                    <Chip
                      label={(message as any).metadata?.agentName || 'Budget & Planning Agent'}
                      size="small"
                      sx={{
                        bgcolor: 'action.selected',
                        color: 'text.primary',
                        fontSize: '11px',
                        height: '24px',
                      }}
                    />
                  </Fade>
                  <Fade in={showChips.get(index) || displayedMessages.has(index)} timeout={600} style={{ transitionDelay: '200ms' }}>
                    <Chip
                      label={(message as any).metadata?.skillName || 'Analysis'}
                      size="small"
                      sx={{
                        bgcolor: 'action.selected',
                        color: 'text.primary',
                        fontSize: '11px',
                        height: '24px',
                      }}
                    />
                  </Fade>
                </Stack>
              </Grow>

              {/* H1 Title with fade in */}
              <Fade in={showTitle.get(index) || displayedMessages.has(index)} timeout={500}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: '24px',
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  {getTitle(message.content || '', message)}
                </Typography>
              </Fade>

              {/* Content with streaming effect */}
              {(showContent.get(index) || displayedMessages.has(index)) && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '14px' }}>
                    <StreamingText
                      content={getContentWithoutTitle(message.content || '')}
                      isStreaming={streamingMessageIndex === index}
                      renderWithCitations={
                        (message as any).metadata?.agentName?.includes('Building Code') || false
                      }
                    />
                  </Box>

                {/* Render ChatVisualization if present */}
                {(message as any).metadata?.suggestedWidget?.visualizationData && (
                  <ChatVisualization
                    type={(message as any).metadata.suggestedWidget.visualizationData.type}
                    title={(message as any).metadata.suggestedWidget.visualizationData.title}
                    data={(message as any).metadata.suggestedWidget.visualizationData.data}
                    chartType={(message as any).metadata.suggestedWidget.visualizationData.chartType}
                    chartConfig={(message as any).metadata.suggestedWidget.visualizationData.chartConfig}
                    columns={(message as any).metadata.suggestedWidget.visualizationData.columns}
                    onAddToDashboard={() => onCardAction?.('addVisualization', (message as any).metadata.suggestedWidget)}
                    buttonText={(message as any).metadata.suggestedWidget.buttonText}
                  />
                )}

                {/* Render EAM Cards if present */}
                {(message as any).metadata?.cardType && (message as any).metadata?.agentType === 'eamScheduler' && (
                  <EAMCardRenderer metadata={(message as any).metadata} onAction={onCardAction} />
                )}
                {/* Render Inspection Cards if present */}
                {(message as any).metadata?.componentType && (message as any).metadata?.agentType === 'inspection' && (
                  <InspectionCardRenderer
                    data={(message as any).metadata?.data}
                    componentType={(message as any).metadata?.componentType}
                  />
                )}

                {/* Render Gen UX components if present */}
                {(message as any).metadata?.uiComponents && (
                  <GenUXMessageRenderer
                    message={message}
                    onComponentAction={onCardAction}
                  />
                )}

                {/* Render prompt if present */}
                {(message as any).metadata?.prompt && (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 3,
                      fontStyle: 'italic',
                      color: 'text.secondary'
                    }}
                  >
                    {(message as any).metadata.prompt}
                  </Typography>
                )}

                </Box>
              )}

              {/* Action Buttons - show after content is done streaming */}
              {!(message as any).metadata?.isFinalMessage && displayedMessages.has(index) && (
                <Box>
                  <Stack direction="row" spacing={1}>
                  <IconButton
                    size="medium"
                    onClick={() => handleCopy(message)}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <ContentCopyIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton
                    size="medium"
                    onClick={() => handleThumbsUp(message, index)}
                    sx={{
                      border: '1px solid',
                      borderColor: messageFeedback.get(index) === 'positive' ? 'success.main' : 'divider',
                      bgcolor: messageFeedback.get(index) === 'positive' ? 'success.light' : 'transparent',
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: 'success.light',
                        borderColor: 'success.main',
                      },
                    }}
                  >
                    <ThumbUpOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: messageFeedback.get(index) === 'positive' ? 'success.main' : 'inherit'
                      }}
                    />
                  </IconButton>
                  <IconButton
                    size="medium"
                    onClick={() => handleThumbsDown(message, index)}
                    sx={{
                      border: '1px solid',
                      borderColor: messageFeedback.get(index) === 'negative' ? 'error.main' : 'divider',
                      bgcolor: messageFeedback.get(index) === 'negative' ? 'error.light' : 'transparent',
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: 'error.light',
                        borderColor: 'error.main',
                      },
                    }}
                  >
                    <ThumbDownOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: messageFeedback.get(index) === 'negative' ? 'error.main' : 'inherit'
                      }}
                    />
                  </IconButton>
                  </Stack>

                  {/* Render feedback card directly under buttons with fade-in */}
                  <Fade in={feedbackCardIndex === index && feedbackCardType !== null} timeout={300}>
                    <Box sx={{ mt: 1.5 }}>
                      {feedbackCardIndex === index && feedbackCardType && (
                        <FeedbackCard
                          feedbackType={feedbackCardType}
                          onSubmit={handleFeedbackCardSubmit}
                          onClose={handleFeedbackCardClose}
                        />
                      )}
                    </Box>
                  </Fade>
                </Box>
              )}

              {/* Final Message */}
              {(message as any).metadata?.isFinalMessage && (
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: 'center',
                    mt: 4,
                    mb: 2,
                    color: 'text.secondary',
                  }}
                >
                  Thank you for your time
                </Typography>
              )}
            </Box>
          )}
        </Box>
      ))}

      {/* Enhanced loading indicator with tool calls */}
      {isLoading && (
        <Fade in={true} timeout={300}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Simulated tool call chips */}
            <ToolCallIndicator thinkingMessage={thinkingMessage} />

            {/* Thinking message */}
            <Box
              sx={{
                minHeight: '40px',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                gap: 1.5,
                pl: 1,
              }}
            >
              <CircularProgress size={16} sx={{ color: 'text.secondary' }} />
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  minHeight: '20px',
                }}
              >
                <ScrambleText
                  text={thinkingMessage || 'Thinking...'}
                  maxLength={35} // Fixed length for all messages
                />
              </Typography>
            </Box>
          </Box>
        </Fade>
      )}

      {/* Feedback Dialog */}
      <FeedbackDialog
        open={feedbackDialog.open}
        onClose={handleFeedbackClose}
        feedbackType={feedbackDialog.type}
        onSubmit={handleFeedbackSubmit}
        messageContent={feedbackDialog.message?.content}
      />

      {/* Feedback Toast */}
      {showToast && (
        <FeedbackToast
          type={feedbackDialog.type}
          onClose={() => setShowToast(false)}
        />
      )}
    </Stack>
  );
};