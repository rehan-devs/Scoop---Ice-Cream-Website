export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9997] flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="text-6xl animate-pulse mb-4">🍦</div>
        <p className="font-body text-sm text-chocolate-light uppercase tracking-[0.2em]">
          Loading...
        </p>
      </div>
    </div>
  );
}