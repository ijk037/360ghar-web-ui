import { Link } from 'react-router-dom';

export default function GuestPrompt() {
  return (
    <div className="chatbot-guest">
      <p className="chatbot-guest__text">
        Sign in to chat with our AI assistant
      </p>
      <div className="chatbot-guest__actions">
        <Link to="/login" className="chatbot-guest__login-btn">
          Sign In
        </Link>
        <Link to="/register" className="chatbot-guest__register-link">
          Create a free account
        </Link>
      </div>
    </div>
  );
}
