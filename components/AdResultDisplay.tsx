
import React from 'react';
import { AdResult } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

interface AdResultDisplayProps {
  result: AdResult;
  onReset: () => void;
}

const AdResultDisplay: React.FC<AdResultDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="w-full animate-fade-in space-y-8">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
          Seu Anúncio está Pronto!
        </h1>
        <p className="text-gray-400">Anúncio para: <span className="font-semibold text-gray-300">{result.productDescription}</span></p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <img
          src={result.imageUrl}
          alt="Anúncio gerado por IA"
          className="rounded-lg shadow-2xl shadow-purple-900/50 w-full max-w-lg border-2 border-purple-500/30"
        />
        <a
          href={result.imageUrl}
          download={`anuncio_${result.productDescription.split(' ')[0]}.png`}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300"
        >
          <DownloadIcon className="w-5 h-5"/>
          Baixar Anúncio
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-left">
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <h3 className="font-bold text-xl mb-3 text-purple-400">Estratégia de Marketing</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{result.strategy}</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <h3 className="font-bold text-xl mb-3 text-purple-400">Prompt de Imagem Usado</h3>
          <p className="text-gray-300 whitespace-pre-wrap text-sm">{result.imagePrompt}</p>
        </div>
      </div>
      
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="bg-gray-700 text-gray-300 font-semibold py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-300"
        >
          Criar Novo Anúncio
        </button>
      </div>
    </div>
  );
};

export default AdResultDisplay;
