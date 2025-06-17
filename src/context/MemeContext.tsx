import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

interface Meme {
  id: string;
  title: string;
  imageUrl: string;
  creator: string;
  price: number;
  upvotes: number;
  aiCaption: string;
  tags: string[];
}

interface MemeContextType {
  memes: Meme[];
  loading: boolean;
  addMeme: (meme: Meme) => void;
  upvoteMeme: (id: string) => void;
  placeBid: (id: string, amount: number) => void;
}

const MemeContext = createContext<MemeContextType | undefined>(undefined);

export const MemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const socket = io('http://localhost:3000');

  useEffect(() => {
    // Connect to WebSocket
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    // Listen for real-time meme updates
    socket.on('memeUpdate', (updatedMeme: Meme) => {
      setMemes(prevMemes => 
        prevMemes.map(meme => 
          meme.id === updatedMeme.id ? updatedMeme : meme
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const addMeme = (meme: Meme) => {
    setMemes(prev => [...prev, meme]);
    socket.emit('newMeme', meme);
  };

  const upvoteMeme = (id: string) => {
    setMemes(prev =>
      prev.map(meme =>
        meme.id === id ? { ...meme, upvotes: meme.upvotes + 1 } : meme
      )
    );
    socket.emit('upvote', id);
  };

  const placeBid = (id: string, amount: number) => {
    socket.emit('placeBid', { memeId: id, amount });
  };

  return (
    <MemeContext.Provider value={{ memes, loading, addMeme, upvoteMeme, placeBid }}>
      {children}
    </MemeContext.Provider>
  );
};

export const useMeme = () => {
  const context = useContext(MemeContext);
  if (!context) {
    throw new Error('useMeme must be used within a MemeProvider');
  }
  return context;
};