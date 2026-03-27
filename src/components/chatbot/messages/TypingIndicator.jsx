export default function TypingIndicator() {
  return (
    <div className="chatbot-typing" role="status" aria-label="AI is thinking">
      <span className="chatbot-typing__dot" />
      <span className="chatbot-typing__dot" />
      <span className="chatbot-typing__dot" />
    </div>
  );
}
