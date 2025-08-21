import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{ className?: string }>;

export function Card({ className = '', children }: CardProps) {
  return (
    <div className={`glass-card ${className}`.trim()}>
      {children}
    </div>
  );
}

export default Card; 