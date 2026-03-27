export default function UserMessage({ message }) {
  return (
    <div className="chatbot-msg chatbot-msg--user">
      <div className="chatbot-msg__bubble">
        {message.content}
      </div>
    </div>
  );
}
