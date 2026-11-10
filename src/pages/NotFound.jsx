import { Compass } from 'lucide-react';
import EmptyState from '../components/EmptyState';

export default function NotFound() {
  return (
    <div className="page">
      <EmptyState icon={Compass} title="This page wandered off" message="The link may be old or the address mistyped. Let’s get you back to something considered." actionLabel="Return home" actionTo="/" />
    </div>
  );
}