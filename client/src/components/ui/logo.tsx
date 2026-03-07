export function Logo({ className = "", size = "text-2xl" }: { className?: string, size?: string }) {
  return (
    <div className={`font-display font-bold ${size} flex items-center tracking-tight ${className}`}>
      <span>Weventr</span>
    </div>
  );
}
