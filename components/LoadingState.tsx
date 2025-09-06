
import React from 'react';

interface LoadingStateProps {
  message: string;
}

const LoadingSpinner: React.FC = () => (
  <svg 
    className="animate-spin -ml-1 mr-3 h-8 w-8 text-purple-400" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20">
      <LoadingSpinner />
      <h2 className="mt-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Nossa IA está trabalhando...
      </h2>
      <p className="text-gray-400 mt-2">{message}</p>
    </div>
  );
};

export default LoadingState;
