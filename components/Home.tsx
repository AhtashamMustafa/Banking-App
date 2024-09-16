

"use client"; // This ensures the component is client-side

import { useState, useEffect } from 'react';
import Home from '../app/(root)/page'; // Import the server-side component
import Loader from '@/components/Loader';

const HomePage = ({ searchParams }: { searchParams: any }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after the component has been mounted
    setIsLoading(false);
  }, []);

  // Show loader while loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  // Render the Home server component once the loader is done
  return <Home searchParams={searchParams} />;
};

export default HomePage;