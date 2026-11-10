import { Link } from 'react-router-dom';

export default function EmptyState({ icon: Icon, title, message, actionLabel, actionTo, onAction }) {
  return (
    <div className="empty-state">
      {Icon && <span className="empty-state__icon"><Icon size={30} strokeWidth={1.4} /></span>}
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__message">{message}</p>
      {actionLabel && (actionTo ? (
        <Link to={actionTo} className="button button--primary">{actionLabel}</Link>
      ) : (
        <button type="button" className="button button--primary" onClick={onAction}>{actionLabel}</button>
      ))}
    </div>
  );
}