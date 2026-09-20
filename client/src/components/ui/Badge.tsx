import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type Tone = 'neutral' | 'success' | 'danger' | 'warning' | 'accent';

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-white/[0.06] text-text-muted',
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger',
  warning: 'bg-warning/10 text-warning',
  accent: 'bg-accent/10 text-accent',
};

interface Props extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = 'neutral', ...props }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium',
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
