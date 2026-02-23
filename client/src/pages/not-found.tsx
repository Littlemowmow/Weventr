export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="w-full max-w-md mx-4 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <p className="text-white/50 text-lg mb-8">
          This page doesn't exist.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
