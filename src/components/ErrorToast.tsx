import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { XCircle } from 'lucide-react';
import { errorState } from '../atom';

export default function ErrorToast() {
  const [error, setError] = useRecoilState(errorState);

  useEffect(() => {
    if (error.show) {
      const timer = setTimeout(() => {
        setError({ show: false, message: '' });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error.show, setError]);

  if (!error.show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
        <XCircle className="w-5 h-5" />
        <p className="text-sm font-medium">{error.message}</p>
      </div>
    </div>
  );
}