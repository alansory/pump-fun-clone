import React, { useState } from 'react'
import { IoRefresh, IoSettingsSharp } from "react-icons/io5";

const Swap: React.FC = () => {
  const [amount, setAmount] = useState('0.00');
  const [isSellingDropdownOpen, setIsSellingDropdownOpen] = useState(false);
  const [isBuyingDropdownOpen, setIsBuyingDropdownOpen] = useState(false);
  const [selectedSellingToken, setSelectedSellingToken] = useState({ symbol: 'USDC', logo: 'https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image-7a811f33-1b06-41e0-8e5d-03463b29742d'});
  const [selectedBuyingToken, setSelectedBuyingToken] = useState({ symbol: 'SOL', logo: 'https://creator-hub-prod.s3.us-east-2.amazonaws.com/claynosaurz_pfp_1679930706147.jpeg'});

  const tokens = [
    { symbol: 'USDC', logo: 'https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image-7a811f33-1b06-41e0-8e5d-03463b29742d'},
    { symbol: 'SOL', logo: 'https://creator-hub-prod.s3.us-east-2.amazonaws.com/claynosaurz_pfp_1679930706147.jpeg'},
    { symbol: 'ETH', logo: 'https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image/9af29abd-bb0b-4bb0-8879-e811b4e60446'},
    { symbol: 'BTC', logo: 'https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image/950e7eef-4da1-47b7-9dd9-507375b9e741'},
    { symbol: 'JUP', logo: 'https://creator-hub-prod.s3.us-east-2.amazonaws.com/claynosaurz_pfp_1679930706147.jpeg'},
    { symbol: 'TRUMP', logo: 'https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image/9af29abd-bb0b-4bb0-8879-e811b4e60446'},
  ]

  const handleSwapTokens = () => {
    const tempToken = selectedSellingToken;
    setSelectedSellingToken(selectedBuyingToken);
    setSelectedBuyingToken(tempToken);
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-2 sm:px-4 py-8 bg-gradient-to-b from-[#120d0d] via-[#241a1a] to-[#120d0d]">
      <div className="w-full max-w-md bg-black rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Swap Type Selector */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div className="flex gap-3 sm:gap-4">
            <button className="text-white text-md font-semibold border-b-2 border-orange-500 pb-1">Swap</button>
            <button className="text-gray-400 text-md font-semibold pb-1">History</button>
          </div>
          <div className="flex items-center">
            <button className="p-1.5 sm:p-2 hover:bg-gray-700/50 rounded-lg text-gray-400">
              <IoRefresh size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
            <button className="p-1.5 sm:p-2 hover:bg-gray-700/50 rounded-lg text-gray-400">
              <IoSettingsSharp size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </div>
  
        {/* Selling Section */}
        <div className="w-full border border-gray-700 shadow-[0_0_0_1px_rgba(249,115,22,0.1)] hover:border-orange-500/60 focus-within:border-orange-500/60 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.3),0_4px_20px_rgba(249,115,22,0.15)] m-0 p-3 sm:p-4 rounded-xl">
          <div className="text-gray-400 text-sm mb-2">Selling</div>
          <div className="flex justify-between items-center">
            <div className="relative">
              <button 
                onClick={() => setIsSellingDropdownOpen(!isSellingDropdownOpen)}
                className="flex items-center gap-2 bg-gray-700/50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg w-auto"
              >
                <img src={selectedSellingToken.logo} alt={selectedSellingToken.symbol} className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-white text-sm sm:text-base flex-1">{selectedSellingToken.symbol}</span>
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${isSellingDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
  
              {isSellingDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-black border border-gray-700 rounded-lg shadow-lg z-50">
                  {tokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setSelectedSellingToken(token)
                        setIsSellingDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700/50"
                    >
                      <img src={token.logo} alt={token.symbol} className="w-6 h-6" />
                      <span className="text-white">{token.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col items-end flex-1 ml-2">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-right text-xl sm:text-2xl text-white outline-none w-full"
                placeholder="0.00"
              />
              <div className="flex items-center gap-2 text-[10px] sm:text-xs mt-1 sm:mt-2">
                <span className="text-gray-400/70 outline-none">$0.00</span>
                <button className="text-white hover:text-orange-500">Max</button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Swap Direction Button */}
        <div className="flex justify-center -my-2 sm:-my-3 relative z-10">
          <button 
            onClick={handleSwapTokens}
            className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>
  
        {/* Buying Section */}
        <div className="w-full border border-gray-700 shadow-[0_0_0_1px_rgba(249,115,22,0.1)] hover:border-orange-500/60 focus-within:border-orange-500/60 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.3),0_4px_20px_rgba(249,115,22,0.15)] p-3 sm:p-4 rounded-xl">
          <div className="text-gray-400 text-sm mb-2">Buying</div>
          <div className="flex justify-between items-center">
            <div className="relative">
              <button 
                onClick={() => setIsBuyingDropdownOpen(!isBuyingDropdownOpen)}
                className="flex items-center gap-2 bg-gray-700/50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg w-auto"
              >
                <img src={selectedBuyingToken.logo} alt={selectedBuyingToken.symbol} className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-white text-sm sm:text-base flex-1">{selectedBuyingToken.symbol}</span>
                <svg className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${isBuyingDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
  
              {/* Dropdown content remains the same */}
              {isBuyingDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-black border border-gray-700 rounded-lg shadow-lg z-50">
                  {tokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setSelectedBuyingToken(token)
                        setIsBuyingDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700/50"
                    >
                      <img src={token.logo} alt={token.symbol} className="w-6 h-6" />
                      <span className="text-white">{token.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col items-end flex-1 ml-2">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-right text-xl sm:text-2xl text-white outline-none w-full"
                placeholder="0.00"
              />
              <div className="flex items-center gap-2 text-[10px] sm:text-xs mt-1 sm:mt-2">
                <span className="text-gray-400/70 outline-none">$0.00</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Connect Button */}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-xl transition-colors">
          Connect
        </button>
      </div>
    </div>
  )
}

export default Swap