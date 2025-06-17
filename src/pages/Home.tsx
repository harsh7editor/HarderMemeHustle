import React, { useEffect, useState } from 'react';
import { useMeme } from '../context/MemeContext';
import { Terminal } from 'lucide-react';

const Home = () => {
  const { memes } = useMeme();
  const [glitchText, setGlitchText] = useState('');

  useEffect(() => {
    const text = "WELCOME TO MEMEHUSTLE";
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setGlitchText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold glitch-text">
          {glitchText}
        </h1>
        <p className="text-neon-pink text-xl">
          Create, Trade, and Battle with AI-Powered Memes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memes.slice(0, 6).map((meme) => (
          <div key={meme.id} className="bg-black border border-neon-green p-4 rounded-lg hover:border-neon-pink transition-colors">
            <img src={meme.imageUrl} alt={meme.title} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-neon-green text-xl mb-2">{meme.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{meme.aiCaption}</p>
            <div className="flex justify-between items-center">
              <span className="text-neon-pink">{meme.price} ETH</span>
              <span className="text-neon-green">⬆ {meme.upvotes}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Terminal className="inline-block w-8 h-8 text-neon-green animate-pulse" />
        <p className="text-gray-400 mt-2">
          Powered by Google Gemini AI and Cyberpunk Magic
        </p>
      </div>
    </div>
  );
};

export default Home;