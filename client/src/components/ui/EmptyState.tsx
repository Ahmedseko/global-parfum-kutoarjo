import { type LucideIcon, Inbox } from 'lucide-react';

interface Props {
  icon?: LucideIcon;
  message: string;
}

export function EmptyState({ icon: Icon = Inbox, message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <Icon size={24} className="text-text-faint" />
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  );
}
