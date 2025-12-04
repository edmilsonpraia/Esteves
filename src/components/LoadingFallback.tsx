import React from 'react';

const LoadingFallback: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Carregando...</h2>
        <p className="text-gray-500">Aguarde um momento</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
