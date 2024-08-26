"use client";
import Link from 'next/link';
import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-6xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-6">Something went wrong.</p>
      <p className="text-lg mb-4">Error: {error || 'Unknown error'}</p>
      <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
