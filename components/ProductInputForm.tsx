
import React, { useState } from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface ProductInputFormProps {
  onGenerate: (productDescription: string) => void;
  isLoading: boolean;
  error: string | null;
}

const ProductInputForm: React.FC<ProductInputFormProps> = ({ onGenerate, isLoading, error }) => {
  const [productDescription, setProductDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productDescription.trim() && !isLoading) {
      onGenerate(productDescription.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20">
      <div className="mb-4 text-purple-400">
        <MagicWandIcon className="w-12 h-12" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
        Gerador de Anúncios com IA
      </h1>
      <p className="text-gray-400 mb-6 max-w-md">
        Descreva o que você quer vender e nossa IA criará uma estratégia de marketing completa e um banner de anúncio pronto para usar.
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Ex: um relógio de luxo suíço, à prova d'água, com pulseira de couro..."
          className="w-full h-32 p-4 bg-gray-900 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none placeholder-gray-500"
          disabled={isLoading}
        />
        {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isLoading || !productDescription.trim()}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
        >
          {isLoading ? 'Gerando...' : 'Criar Anúncio Mágico'}
          <MagicWandIcon className="w-5 h-5"/>
        </button>
      </form>
    </div>
  );
};

export default ProductInputForm;
