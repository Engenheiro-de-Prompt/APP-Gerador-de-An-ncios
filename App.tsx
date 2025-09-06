
import React, { useState, useCallback } from 'react';
import { AppView, AdResult } from './types';
import ProductInputForm from './components/ProductInputForm';
import AdResultDisplay from './components/AdResultDisplay';
import LoadingState from './components/LoadingState';
import { generateAdContent, createVisualAd } from './services/geminiService';
import { createTextImageAsBase64 } from './utils/imageUtils';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.FORM);
  const [adResult, setAdResult] = useState<AdResult | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAd = useCallback(async (productDescription: string) => {
    setView(AppView.LOADING);
    setError(null);

    try {
      // Step 1: Generate Strategy and Ad Copy
      setLoadingMessage('Criando estratégia de marketing...');
      const { strategy, adCopy } = await generateAdContent(productDescription);

      // Step 2: Create initial text image
      setLoadingMessage('Preparando o rascunho do anúncio...');
      const initialImageBase64 = await createTextImageAsBase64(adCopy);

      // Step 3: Create prompt for image enhancement
      const imagePrompt = `Transforme esta imagem de texto simples em um anúncio visualmente atraente e profissional para um banner. Use a seguinte estratégia de marketing como guia para o estilo, cores, e elementos visuais. O texto na imagem deve permanecer legível e proeminente.

Estratégia: "${strategy}"

Não adicione nenhum texto novo, apenas use o texto já presente na imagem. Crie uma imagem com apelo premium e que evoque o sentimento descrito na estratégia.`;
      
      // Step 4: Enhance image with AI
      setLoadingMessage('Aprimorando o visual com IA...');
      const finalImageBase64 = await createVisualAd(initialImageBase64, imagePrompt);
      const finalImageUrl = `data:image/png;base64,${finalImageBase64}`;

      setAdResult({
        imageUrl: finalImageUrl,
        strategy,
        imagePrompt,
        productDescription,
      });
      setView(AppView.RESULT);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido. Por favor, tente novamente.');
      setView(AppView.FORM);
    }
  }, []);

  const handleReset = useCallback(() => {
    setView(AppView.FORM);
    setAdResult(null);
    setError(null);
  }, []);
  
  const renderContent = () => {
    switch (view) {
      case AppView.LOADING:
        return <LoadingState message={loadingMessage} />;
      case AppView.RESULT:
        return adResult && <AdResultDisplay result={adResult} onReset={handleReset} />;
      case AppView.FORM:
      default:
        return (
          <ProductInputForm
            onGenerate={handleGenerateAd}
            isLoading={view === AppView.LOADING}
            error={error}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <main className="w-full max-w-4xl mx-auto">
        {renderContent()}
      </main>
      <footer className="text-center text-gray-500 mt-8 text-sm">
        <p>Criado com React, Tailwind CSS e Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
