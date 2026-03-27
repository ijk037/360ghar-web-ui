import ChatBubble from './ChatBubble';
import ChatPanel from './ChatPanel';
import { useAuthStore } from '../../store';

function ChatBot() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="chatbot-container">
      <ChatBubble />
      <ChatPanel isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default ChatBot;
