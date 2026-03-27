import ChatBubble from './ChatBubble';
import ChatPanel from './ChatPanel';
import { useChatStore, useAuthStore } from '../../store';

function ChatBot() {
  const isOpen = useChatStore((state) => state.isOpen);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="chatbot-container">
      <ChatBubble />
      <ChatPanel isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default ChatBot;
