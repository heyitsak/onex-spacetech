import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-12 h-12 rounded-full bg-[rgba(84,114,230,0.1)] border border-[rgba(84,114,230,0.2)] flex items-center justify-center mx-auto mb-6">
          <span className="text-lg font-bold text-[#5472E6]">?</span>
        </div>
        <h1 className="text-4xl font-bold text-[#E8ECF4] tracking-tight mb-3">404</h1>
        <p className="text-sm text-[#8A92A5] mb-8">
          This page does not exist.
        </p>
        <Link href="/" className="btn-primary px-6 py-2.5 text-sm">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
