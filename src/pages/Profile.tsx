import React from 'react';
import { useMeme } from '../context/MemeContext';
import { User, Briefcase, Award } from 'lucide-react';

const Profile = () => {
  const { memes } = useMeme();
  const userMemes = memes.filter(meme => meme.creator === 'Anonymous');

  const stats = {
    totalMemes: userMemes.length,
    totalUpvotes: userMemes.reduce((acc, meme) => acc + meme.upvotes, 0),
    totalValue: userMemes.reduce((acc, meme) => acc + meme.price, 0)
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4 p-6 border border-neon-green rounded-lg">
        <div className="w-24 h-24 rounded-full bg-neon-green flex items-center justify-center">
          <User className="w-12 h-12 text-black" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neon-green">Anonymous</h1>
          <p className="text-gray-400">Cyberpunk Meme Creator</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <Briefcase className="w-8 h-8 text-neon-green" />
          <div className="text-center">
            <h3 className="text-xl text-gray-400">Total Memes</h3>
            <p className="text-2xl font-bold text-neon-green">{stats.totalMemes}</p>
          </div>
        </div>
        <div className="stat-card">
          <Award className="w-8 h-8 text-neon-pink" />
          <div className="text-center">
            <h3 className="text-xl text-gray-400">Total Upvotes</h3>
            <p className="text-2xl font-bold text-neon-pink">{stats.totalUpvotes}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="text-2xl font-bold text-neon-green">Ξ</div>
          <div className="text-center">
            <h3 className="text-xl text-gray-400">Portfolio Value</h3>
            <p className="text-2xl font-bold text-neon-green">{stats.totalValue.toFixed(2)} ETH</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-neon-green">Your Memes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userMemes.map((meme) => (
            <div key={meme.id} className="border border-neon-green rounded-lg overflow-hidden">
              <img src={meme.imageUrl} alt={meme.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-neon-green">{meme.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-neon-pink">{meme.price} ETH</span>
                  <span className="text-neon-green">⬆ {meme.upvotes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;