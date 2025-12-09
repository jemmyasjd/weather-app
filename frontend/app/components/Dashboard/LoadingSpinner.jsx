import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 'default', text = 'Loading...' }) {
  const sizes = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Loader2 className={`${sizes[size]} animate-spin text-primary`} />
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}