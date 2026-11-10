import { Loader2 } from 'lucide-react';

export default function LoadingState({ label = 'Curating your experience…' }) {
  return (
    <div className="loading-state" role="status">
      <Loader2 size={28} className="loading-state__spinner" />
      <p>{label}</p>
    </div>
  );
}