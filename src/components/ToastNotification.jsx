import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const icons = { success: CheckCircle2, error: AlertCircle, info: Info };

export default function ToastNotification() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => {
        const Icon = icons[toast.tone] || Info;
        return (
          <div key={toast.id} className={`toast toast--${toast.tone}`} role="status">
            <Icon size={18} className="toast__icon" />
            <p className="toast__message">{toast.message}</p>
            <button type="button" className="toast__dismiss" onClick={() => dismiss(toast.id)} aria-label="Dismiss notification">
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}