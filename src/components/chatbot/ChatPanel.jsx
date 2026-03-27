import { useChatStore } from '../../store';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

// GuestPrompt will be replaced by import from './messages/GuestPrompt' in Phase 4
const GuestPrompt = () => (
  <div className="chatbot-guest-placeholder" style={{ padding: '16px', textAlign: 'center', color: '#666' }}>
    <p>Please log in to start chatting</p>
  </div>
);

function ChatPanel({ isAuthenticated }) {
  const isOpen = useChatStore((state) => state.isOpen);

  return (
    <div
      className={`chatbot-panel${isOpen ? ' chatbot-panel--open' : ''}`}
      role="dialog"
      aria-label="Chat with 360Ghar AI assistant"
      aria-modal="true"
      aria-hidden={!isOpen}
      style={{ zIndex: 9998 }}
    >
      <ChatHeader />
      <ChatMessages />
      {isAuthenticated ? <ChatInput /> : <GuestPrompt />}
    </div>
  );
}

export default ChatPanel;
