import React, { useState } from 'react';
import { useMeme } from '../context/MemeContext';
import { Upload, Zap } from 'lucide-react';

const Create = () => {
  const { addMeme } = useMeme();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiCaption, setAiCaption] = useState('');

  const generateAICaption = async () => {
    setLoading(true);
    try {
      // Mock AI caption generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAiCaption('AI-generated cyberpunk meme caption goes here...');
    } catch (error) {
      console.error('Error generating caption:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    const newMeme = {
      id: Date.now().toString(),
      title,
      imageUrl: URL.createObjectURL(file),
      creator: 'Anonymous',
      price: 0.1,
      upvotes: 0,
      aiCaption,
      tags: ['cyberpunk', 'ai-generated']
    };

    addMeme(newMeme);
    setTitle('');
    setFile(null);
    setAiCaption('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center glitch-text">Create New Meme</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-neon-green">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black border border-neon-green p-2 rounded text-white focus:border-neon-pink outline-none"
            placeholder="Enter meme title"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-neon-green">Upload Image</label>
          <div className="border-2 border-dashed border-neon-green rounded-lg p-8 text-center">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
              accept="image/*"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-neon-green" />
              <p className="mt-2 text-sm text-gray-400">
                Click to upload or drag and drop
              </p>
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={generateAICaption}
          className="w-full flex items-center justify-center space-x-2 bg-black border border-neon-pink p-2 rounded hover:bg-neon-pink hover:text-black transition-colors"
          disabled={loading}
        >
          <Zap className="w-5 h-5" />
          <span>{loading ? 'Generating...' : 'Generate AI Caption'}</span>
        </button>

        {aiCaption && (
          <div className="p-4 border border-neon-green rounded">
            <p className="text-gray-400">{aiCaption}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-neon-green text-black p-2 rounded font-bold hover:bg-neon-pink transition-colors"
          disabled={!file || !title}
        >
          Create Meme
        </button>
      </form>
    </div>
  );
};

export default Create;