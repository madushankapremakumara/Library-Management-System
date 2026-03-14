import '../styles/ActionPanel.css'
 
const actions = ["Borrow Book", "Return Book", "Pay Fine"]
 
function ActionPanel({ activeAction, onActionChange }) {
  return (
    <div className="lms-quick-actions">
      {actions.map((action) => (
        <button
          key={action}
          className={`lms-quick-action-btn ${activeAction === action ? "active" : ""}`}
          onClick={() => onActionChange(action)}
        >
          {action} <span>→</span>
        </button>
      ))}
    </div>
  )
}
 
export default ActionPanel