import { useChatStore } from '../../store';
import ChatHeader from './ChatHeader';

// Temporary placeholders - will be replaced by actual imports in Phase 3
const MessagesPlaceholder = () => (
  <div className="chatbot-messages-placeholder" style={{ flex: 1 }} />
);
const InputPlaceholder = () => (
  <div className="chatbot-input-placeholder" style={{ height: '60px' }} />
);
const GuestPlaceholder = () => (
  <div className="chatbot-guest-placeholder" style={{ height: '60px' }} />
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
      <MessagesPlaceholder />
      {isAuthenticated ? <InputPlaceholder /> : <GuestPlaceholder />}
    </div>
  );
}

export default ChatPanel;
