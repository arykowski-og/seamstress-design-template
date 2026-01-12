import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import ChatInterfacePage from '../pages/agent-studio/ChatInterfacePage';
import { useWorkspaceChat } from '../contexts/WorkspaceChatContext';

export const DockedWorkspaceChat: React.FC = () => {
  const { isDocked, isOpen, dockedWidth, setIsDocked, setDockedWidth } = useWorkspaceChat();
  const [showWorkspaces, setShowWorkspaces] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [workspacesWidth, setWorkspacesWidth] = useState(400);
  const [tasksWidth, setTasksWidth] = useState(450);
  const [isResizing, setIsResizing] = useState<'workspaces' | 'tasks' | 'docked' | null>(null);
  const resizeStartX = useRef<number>(0);
  const resizeStartWidth = useRef<number>(0);

  // Panel width constraints
  const WORKSPACES_MIN = 300;
  const WORKSPACES_MAX = 600;
  const TASKS_MIN = 420;
  const TASKS_MAX = 800;
  const DOCKED_MIN = 600;
  const DOCKED_MAX = window.innerWidth * 0.8;

  // Handle resize start
  const handleResizeStart = (panel: 'workspaces' | 'tasks' | 'docked', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(panel);
    resizeStartX.current = e.clientX;
    if (panel === 'docked') {
      resizeStartWidth.current = dockedWidth;
    } else {
      resizeStartWidth.current = panel === 'workspaces' ? workspacesWidth : tasksWidth;
    }
  };

  // Handle resize move
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - resizeStartX.current;

      if (isResizing === 'docked') {
        // Resizing docked container from left edge - negative delta increases width
        const newWidth = Math.max(DOCKED_MIN, Math.min(DOCKED_MAX, resizeStartWidth.current - delta));
        setDockedWidth(newWidth);
      } else if (isResizing === 'workspaces') {
        const newWidth = Math.max(WORKSPACES_MIN, Math.min(WORKSPACES_MAX, resizeStartWidth.current + delta));
        setWorkspacesWidth(newWidth);
      } else if (isResizing === 'tasks') {
        const newWidth = Math.max(TASKS_MIN, Math.min(TASKS_MAX, resizeStartWidth.current - delta));
        setTasksWidth(newWidth);
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

  const handleToggleDock = () => {
    setIsDocked(false);
  };

  const handleClose = () => {
    setIsDocked(false);
  };

  if (!isOpen || !isDocked) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: `${dockedWidth}px`,
        borderLeft: 1,
        borderColor: 'divider',
        bgcolor: 'background.secondary',
        display: 'flex',
        flexDirection: 'row',
        zIndex: 1200,
      }}
    >
      {/* Docked Container Resize Handle */}
      <Box
        onMouseDown={(e) => handleResizeStart('docked', e)}
        sx={{
          width: '8px',
          cursor: 'col-resize',
          bgcolor: 'divider',
          '&:hover': {
            bgcolor: 'rgb(100, 116, 139)',
          },
          transition: 'background-color 0.2s',
          flexShrink: 0,
          zIndex: 10,
        }}
      />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <ChatInterfacePage
          onClose={handleClose}
          onToggleDock={handleToggleDock}
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
    </Box>
  );
};
