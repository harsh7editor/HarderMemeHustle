import React, { useState } from 'react';
import { useMeme } from '../context/MemeContext';
import { ThumbsUp, DollarSign, Tags } from 'lucide-react';

const Marketplace = () => {
  const { memes, upvoteMeme, placeBid } = useMeme();
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const tags = ['all', 'cyberpunk', 'ai-generated', 'trending'];

  const filteredMemes = selectedTag === 'all' 
    ? memes 
    : memes.filter(meme => meme.tags.includes(selectedTag));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold glitch-text">Meme Marketplace</h1>
        <div className="flex space-x-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded ${
                selectedTag === tag 
                  ? 'bg-neon-green text-black' 
                  : 'border border-neon-green text-neon-green'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemes.map((meme) => (
          <div key={meme.id} className="bg-black border border-neon-green rounded-lg overflow-hidden hover:border-neon-pink transition-all transform hover:scale-105">
            <img src={meme.imageUrl} alt={meme.title} className="w-full h-48 object-cover" />
            
            <div className="p-4 space-y-4">
              <h3 className="text-xl font-bold text-neon-green">{meme.title}</h3>
              <p className="text-gray-400 text-sm">{meme.aiCaption}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-neon-pink" />
                  <span className="text-neon-pink">{meme.price} ETH</span>
                </div>
                <button
                  onClick={() => upvoteMeme(meme.id)}
                  className="flex items-center space-x-1 text-neon-green hover:text-neon-pink"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{meme.upvotes}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <Tags className="w-4 h-4 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {meme.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => placeBid(meme.id, meme.price + 0.1)}
                className="w-full bg-black border border-neon-pink text-neon-pink py-2 rounded hover:bg-neon-pink hover:text-black transition-colors"
              >
                Place Bid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;