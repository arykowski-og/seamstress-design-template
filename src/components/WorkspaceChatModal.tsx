/**
 * WorkspaceChatModal - Modal wrapper for the chat interface
 */

import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import { PageLast } from '@opengov/react-capital-assets/icons';
import ChatInterfacePage from '../pages/agent-studio/ChatInterfacePage';
import { useWorkspaceChat } from '../contexts/WorkspaceChatContext';
import 'react-resizable/css/styles.css';

export const WorkspaceChatModal: React.FC = () => {
  const { isDocked, isOpen, dockedWidth, setIsDocked, setIsOpen, setDockedWidth } = useWorkspaceChat();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState({ width: 600, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [snapPosition, setSnapPosition] = useState<'none' | 'left' | 'right'>('none');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragDistance, setDragDistance] = useState({ left: 0, right: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWorkspaces, setShowWorkspaces] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [workspacesWidth, setWorkspacesWidth] = useState(400);
  const [tasksWidth, setTasksWidth] = useState(450);
  const [isResizing, setIsResizing] = useState<'workspaces' | 'tasks' | null>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const draggableNodeRef = useRef<HTMLDivElement>(null);
  const resizeStartX = useRef<number>(0);
  const resizeStartWidth = useRef<number>(0);

  // Panel width constraints
  const WORKSPACES_MIN = 300;
  const WORKSPACES_MAX = 600;
  const TASKS_MIN = 420;
  const TASKS_MAX = 800;
  const CHAT_MIN_WIDTH = 420;
  const DIVIDER_WIDTH = 8;

  // Calculate modal width based on visible panels
  const calculateModalWidth = (workspaces: boolean, tasks: boolean) => {
    let width = CHAT_MIN_WIDTH;
    if (workspaces) width += workspacesWidth + DIVIDER_WIDTH;
    if (tasks) width += tasksWidth + DIVIDER_WIDTH;
    return width;
  };

  // Handle resize start
  const handleResizeStart = (panel: 'workspaces' | 'tasks', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(panel);
    resizeStartX.current = e.clientX;
    resizeStartWidth.current = panel === 'workspaces' ? workspacesWidth : tasksWidth;
  };

  // Handle resize move
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - resizeStartX.current;

      if (isResizing === 'workspaces') {
        // Resizing workspaces panel - grows to the right, shrinks chat
        const newWorkspacesWidth = Math.max(WORKSPACES_MIN, Math.min(WORKSPACES_MAX, resizeStartWidth.current + delta));
        setWorkspacesWidth(newWorkspacesWidth);
        // Don't change modal width, just redistribute space
      } else if (isResizing === 'tasks') {
        // Resizing tasks panel - grows to the left, shrinks chat
        const newTasksWidth = Math.max(TASKS_MIN, Math.min(TASKS_MAX, resizeStartWidth.current - delta));
        setTasksWidth(newTasksWidth);
        // Don't change modal width, just redistribute space
      }
    };

    const handleMouseUp = () => {
      setIsResizing(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Update modal size ONLY when panels are toggled (not when resizing)
  useEffect(() => {
    if (isFullscreen || snapPosition !== 'none' || isResizing) return;

    const newWidth = calculateModalWidth(showWorkspaces, showTasks);
    const widthDiff = newWidth - size.width;

    setSize(prev => ({ ...prev, width: newWidth }));

    // Adjust position to keep modal centered when width changes
    setPosition(prev => ({
      x: prev.x - widthDiff / 2,
      y: prev.y
    }));
  }, [showWorkspaces, showTasks]);

  // Sync local open state with context
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // Update context dockedWidth when size changes in docked mode
  useEffect(() => {
    if (isDocked) {
      setDockedWidth(size.width);
    }
  }, [isDocked, size.width, setDockedWidth]);

  useEffect(() => {
    // Register global function to open the modal
    (window as any).openWorkspaceChat = () => {
      setIsOpen(true);
      // Reset to center when opening
      const initialWidth = CHAT_MIN_WIDTH;
      const centerX = window.innerWidth / 2 - initialWidth / 2;
      const centerY = window.innerHeight / 2 - 300;
      setPosition({ x: centerX, y: centerY });
      setSize({ width: initialWidth, height: 600 });
      setSnapPosition('none');
    };

    return () => {
      delete (window as any).openWorkspaceChat;
    };
  }, [setIsOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggleDock = () => {
    const newDocked = !isDocked;
    setIsDocked(newDocked);
    if (newDocked) {
      // Entering docked mode
      setIsFullscreen(false);
      setSnapPosition('none');
    }
  };

  const handleToggleFullscreen = () => {
    if (!isFullscreen) {
      // Enter fullscreen - full viewport width
      setIsFullscreen(true);
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setSnapPosition('none');
    } else {
      // Exit fullscreen - return to center
      setIsFullscreen(false);
      const centerX = window.innerWidth / 2 - 300;
      const centerY = window.innerHeight / 2 - 300;
      setPosition({ x: centerX, y: centerY });
      setSize({ width: 600, height: 600 });
      setSnapPosition('none');
    }
  };

  const handleResize = (event: any, { size }: any) => {
    setSize({ width: size.width, height: size.height });
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (e: any, data: any) => {
    const SNAP_THRESHOLD = 100;
    const SHADOW_START_DISTANCE = 200;

    const leftDistance = data.x;
    const rightDistance = window.innerWidth - (data.x + size.width);

    // Calculate shadow intensity (0 to 1)
    const leftIntensity = Math.max(0, Math.min(1, (SHADOW_START_DISTANCE - leftDistance) / SHADOW_START_DISTANCE));
    const rightIntensity = Math.max(0, Math.min(1, (SHADOW_START_DISTANCE - rightDistance) / SHADOW_START_DISTANCE));

    setDragDistance({ left: leftIntensity, right: rightIntensity });
    setPosition({ x: data.x, y: data.y });
  };

  const handleDragStop = (e: any, data: any) => {
    setIsDragging(false);
    setDragDistance({ left: 0, right: 0 });

    const SNAP_THRESHOLD = 100;
    const leftDistance = data.x;
    const rightDistance = window.innerWidth - (data.x + size.width);

    // Snap to left
    if (leftDistance < SNAP_THRESHOLD) {
      setSnapPosition('left');
      setPosition({ x: 0, y: data.y });
    }
    // Snap to right
    else if (rightDistance < SNAP_THRESHOLD) {
      setSnapPosition('right');
      setPosition({ x: window.innerWidth - size.width, y: data.y });
    }
    // No snap
    else {
      setSnapPosition('none');
      setPosition({ x: data.x, y: data.y });
    }
  };

  if (!open || isDocked) return null;

  // Modal mode
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1300,
        pointerEvents: 'none',
      }}
    >
      {/* Left snap indicator */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: `${position.y}px`,
          height: `${size.height}px`,
          width: '80px',
          bgcolor: 'rgb(100, 116, 139)',
          opacity: dragDistance.left * 0.5,
          filter: 'blur(20px)',
          transition: isDragging ? 'none' : 'opacity 0.2s, top 0.1s, height 0.1s',
          pointerEvents: 'none',
        }}
      />

      {/* Right snap indicator */}
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: `${position.y}px`,
          height: `${size.height}px`,
          width: '80px',
          bgcolor: 'rgb(100, 116, 139)',
          opacity: dragDistance.right * 0.5,
          filter: 'blur(20px)',
          transition: isDragging ? 'none' : 'opacity 0.2s, top 0.1s, height 0.1s',
          pointerEvents: 'none',
        }}
      />

      <Draggable
        handle="#chat-drag-handle"
        bounds="parent"
        position={position}
        onStart={handleDragStart}
        onDrag={handleDrag}
        onStop={handleDragStop}
        nodeRef={draggableNodeRef}
      >
        <Box ref={draggableNodeRef} sx={{ position: 'absolute', pointerEvents: 'all' }}>
          <Resizable
            width={size.width}
            height={size.height}
            onResize={handleResize}
            minConstraints={[400, 400]}
            maxConstraints={[1600, 1000]}
            resizeHandles={['se', 'sw', 's', 'e', 'w']}
          >
            <Box
              sx={{
                width: `${size.width}px`,
                height: `${size.height}px`,
                borderRadius: isFullscreen ? 0 :
                  snapPosition === 'left' ? '0 24px 24px 0' :
                  snapPosition === 'right' ? '24px 0 0 24px' :
                  '24px',
                boxShadow: isDragging ? 3 : 24,
                bgcolor: 'background.secondary',
                border: 1,
                borderColor: 'divider',
                overflow: 'hidden',
                transition: (isDragging || isResizing) ? 'none' : 'box-shadow 0.2s, border-radius 0.3s',
                '& .react-resizable-handle': {
                  position: 'absolute',
                  zIndex: 10,
                  opacity: 0,
                },
                '& .react-resizable-handle-se': {
                  bottom: 0,
                  right: 0,
                  cursor: 'se-resize',
                  width: '20px',
                  height: '20px',
                },
                '& .react-resizable-handle-sw': {
                  bottom: 0,
                  left: 0,
                  cursor: 'sw-resize',
                  width: '20px',
                  height: '20px',
                },
                '& .react-resizable-handle-s': {
                  bottom: 0,
                  left: 0,
                  right: 0,
                  cursor: 's-resize',
                  height: '10px',
                },
                '& .react-resizable-handle-e': {
                  right: 0,
                  top: 0,
                  bottom: 0,
                  cursor: 'e-resize',
                  width: '10px',
                },
                '& .react-resizable-handle-w': {
                  left: 0,
                  top: 0,
                  bottom: 0,
                  cursor: 'w-resize',
                  width: '10px',
                },
              }}
            >
              <ChatInterfacePage
                onClose={handleClose}
                dragHandleRef={dragHandleRef}
                onToggleFullscreen={handleToggleFullscreen}
                onToggleDock={handleToggleDock}
                isFullscreen={isFullscreen}
                isDocked={isDocked}
                showWorkspaces={showWorkspaces}
                showTasks={showTasks}
                onWorkspacesChange={setShowWorkspaces}
                onTasksChange={setShowTasks}
                workspacesWidth={workspacesWidth}
                tasksWidth={tasksWidth}
                onResizeStart={handleResizeStart}
              />
            </Box>
          </Resizable>
        </Box>
      </Draggable>
    </Box>
  );
};

export default WorkspaceChatModal;
