import React, { createContext, useContext, useState } from 'react';

interface WorkspaceChatContextType {
  isDocked: boolean;
  isOpen: boolean;
  dockedWidth: number;
  setIsDocked: (docked: boolean) => void;
  setIsOpen: (open: boolean) => void;
  setDockedWidth: (width: number) => void;
  openWorkspaceChat: () => void;
  closeWorkspaceChat: () => void;
}

const WorkspaceChatContext = createContext<WorkspaceChatContextType | undefined>(undefined);

export const WorkspaceChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDocked, setIsDocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dockedWidth, setDockedWidth] = useState(600);

  const openWorkspaceChat = () => setIsOpen(true);
  const closeWorkspaceChat = () => setIsOpen(false);

  return (
    <WorkspaceChatContext.Provider
      value={{
        isDocked,
        isOpen,
        dockedWidth,
        setIsDocked,
        setIsOpen,
        setDockedWidth,
        openWorkspaceChat,
        closeWorkspaceChat,
      }}
    >
      {children}
    </WorkspaceChatContext.Provider>
  );
};

export const useWorkspaceChat = () => {
  const context = useContext(WorkspaceChatContext);
  if (!context) {
    throw new Error('useWorkspaceChat must be used within WorkspaceChatProvider');
  }
  return context;
};
