import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2.5 py-1.5">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to <span className="italic underline">Bumiswap</span></h1>
      <p className="text-lg mb-6 text-center max-w-md">
        Trade Solana memecoins with 0.5% fees, MEV protection, and social logins.
      </p>
      <button className="px-4 py-2 bg-orange-500 text-amber-950 font-bold rounded-lg hover:bg-orange-400 transition">
        Start Trading Now
      </button>
    </div>
  );
};

export default Home;