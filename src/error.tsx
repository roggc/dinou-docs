"use client";

export default function Page() {
  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-red-600">Error</h1>
        <p className="text-lg text-gray-700">
          An unexpected error has occurred. Please try again later.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </a>
      </div>
    </main>
  );
}
