import React from 'react'
import { HiAdjustments } from 'react-icons/hi'
import { BiSortAlt2 } from 'react-icons/bi'
interface TokenData {
  id: number;
  name: string;
  symbol: string;
  imageUri: string;
  price: number;
  sellPrice: number;
  volume24h: number;
  priceChange24h: number;
  trades: number;
  marketCap: number;
  totalVolume: number;
  listed: string;
}

const Trade: React.FC = () => {
  // Data converted from the provided JSON
  const tokens: TokenData[] = [
    {
      id: 1,
      name: "SMB Gen2",
      symbol: "4992",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image/adf0c9f9-8438-4ed3-862a-b82d8f380495",
      price: 23.87,
      sellPrice: 22.50,
      volume24h: 1684.08,
      priceChange24h: 1.85,
      trades: 72,
      marketCap: 119181.95,
      totalVolume: 2718422.47,
      listed: "7% [335]"
    },
    {
      id: 2,
      name: "Famous Fox Federation",
      symbol: "9735",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image-a00199bb-0c51-450a-8ef1-79564685aecf",
      price: 3.17,
      sellPrice: 3.18,
      volume24h: 372.43,
      priceChange24h: 0.11,
      trades: 117,
      marketCap: 30950.48,
      totalVolume: 1520317.40,
      listed: "4% [369]"
    },
    {
      id: 3,
      name: "Frogana",
      symbol: "5554",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image-9ef3f879-ec4e-4994-9eff-098990d43aa0",
      price: 1.00,
      sellPrice: 0.98,
      volume24h: 363.47,
      priceChange24h: -3.41,
      trades: 364,
      marketCap: 5577.32,
      totalVolume: 2130680.72,
      listed: "24% [1318]"
    },
    {
      id: 4,
      name: "Mad Lads",
      symbol: "8968",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image-59c7bcf2-bcb3-4cd3-9301-68ee6a474926",
      price: 44.00,
      sellPrice: 44.46,
      volume24h: 357.26,
      priceChange24h: -2.70,
      trades: 8,
      marketCap: 438592.00,
      totalVolume: 3432197.96,
      listed: "3% [293]"
    },
    {
      id: 5,
      name: "Rogues",
      symbol: "3333",
      imageUri: "https://bafybeiclnf6uejoz5br53mpqq6mdld647ng5jznnknhueyhsvspm3djdlm.ipfs.w3s.link/isotipo_RGB_quadrado_pink_denin__Name_Clash_2025-04-01_yLlJcNM_.png",
      price: 0.89,
      sellPrice: 0.91,
      volume24h: 300.23,
      priceChange24h: -21.75,
      trades: 224,
      marketCap: 2999.33,
      totalVolume: 1856.92,
      listed: "10% [325]"
    },
    {
      id: 6,
      name: "Retardio Cousins",
      symbol: "4442",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image/950e7eef-4da1-47b7-9dd9-507375b9e741",
      price: 5.23,
      sellPrice: 4.35,
      volume24h: 152.12,
      priceChange24h: 16.87,
      trades: 26,
      marketCap: 23241.87,
      totalVolume: 186790.15,
      listed: "12% [514]"
    },
    {
      id: 7,
      name: "Paradise",
      symbol: "8888",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image/9af29abd-bb0b-4bb0-8879-e811b4e60446",
      price: 9.09,
      sellPrice: 1.01,
      volume24h: 143.16,
      priceChange24h: -24.35,
      trades: 15,
      marketCap: 80806.14,
      totalVolume: 10771.16,
      listed: "0% [25]"
    },
    {
      id: 8,
      name: "Lifinity Flares",
      symbol: "9473",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image-7a811f33-1b06-41e0-8e5d-03463b29742d",
      price: 9.63,
      sellPrice: 8.16,
      volume24h: 138.34,
      priceChange24h: 12.78,
      trades: 16,
      marketCap: 91294.66,
      totalVolume: 177889.04,
      listed: "2% [167]"
    },
    {
      id: 9,
      name: "Claynosaurz",
      symbol: "10232",
      imageUri: "https://creator-hub-prod.s3.us-east-2.amazonaws.com/claynosaurz_pfp_1679930706147.jpeg",
      price: 11.42,
      sellPrice: 10.62,
      volume24h: 132.65,
      priceChange24h: -4.75,
      trades: 11,
      marketCap: 116902.64,
      totalVolume: 2083633.99,
      listed: "4% [426]"
    },
    {
      id: 7,
      name: "Paradise",
      symbol: "8888",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image/9af29abd-bb0b-4bb0-8879-e811b4e60446",
      price: 9.09,
      sellPrice: 1.01,
      volume24h: 143.16,
      priceChange24h: -24.35,
      trades: 15,
      marketCap: 80806.14,
      totalVolume: 10771.16,
      listed: "0% [25]"
    },
    {
      id: 8,
      name: "Lifinity Flares",
      symbol: "9473",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image-7a811f33-1b06-41e0-8e5d-03463b29742d",
      price: 9.63,
      sellPrice: 8.16,
      volume24h: 138.34,
      priceChange24h: 12.78,
      trades: 16,
      marketCap: 91294.66,
      totalVolume: 177889.04,
      listed: "2% [167]"
    },
    {
      id: 9,
      name: "Claynosaurz",
      symbol: "10232",
      imageUri: "https://creator-hub-prod.s3.us-east-2.amazonaws.com/claynosaurz_pfp_1679930706147.jpeg",
      price: 11.42,
      sellPrice: 10.62,
      volume24h: 132.65,
      priceChange24h: -4.75,
      trades: 11,
      marketCap: 116902.64,
      totalVolume: 2083633.99,
      listed: "4% [426]"
    },
    {
      id: 1,
      name: "SMB Gen2",
      symbol: "4992",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image/adf0c9f9-8438-4ed3-862a-b82d8f380495",
      price: 23.87,
      sellPrice: 22.50,
      volume24h: 1684.08,
      priceChange24h: 1.85,
      trades: 72,
      marketCap: 119181.95,
      totalVolume: 2718422.47,
      listed: "7% [335]"
    },
    {
      id: 2,
      name: "Famous Fox Federation",
      symbol: "9735",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image-a00199bb-0c51-450a-8ef1-79564685aecf",
      price: 3.17,
      sellPrice: 3.18,
      volume24h: 372.43,
      priceChange24h: 0.11,
      trades: 117,
      marketCap: 30950.48,
      totalVolume: 1520317.40,
      listed: "4% [369]"
    },
    {
      id: 3,
      name: "Frogana",
      symbol: "5554",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image-9ef3f879-ec4e-4994-9eff-098990d43aa0",
      price: 1.00,
      sellPrice: 0.98,
      volume24h: 363.47,
      priceChange24h: -3.41,
      trades: 364,
      marketCap: 5577.32,
      totalVolume: 2130680.72,
      listed: "24% [1318]"
    },
    {
      id: 4,
      name: "Mad Lads",
      symbol: "8968",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image-59c7bcf2-bcb3-4cd3-9301-68ee6a474926",
      price: 44.00,
      sellPrice: 44.46,
      volume24h: 357.26,
      priceChange24h: -2.70,
      trades: 8,
      marketCap: 438592.00,
      totalVolume: 3432197.96,
      listed: "3% [293]"
    },
    {
      id: 5,
      name: "Rogues",
      symbol: "3333",
      imageUri: "https://bafybeiclnf6uejoz5br53mpqq6mdld647ng5jznnknhueyhsvspm3djdlm.ipfs.w3s.link/isotipo_RGB_quadrado_pink_denin__Name_Clash_2025-04-01_yLlJcNM_.png",
      price: 0.89,
      sellPrice: 0.91,
      volume24h: 300.23,
      priceChange24h: -21.75,
      trades: 224,
      marketCap: 2999.33,
      totalVolume: 1856.92,
      listed: "10% [325]"
    },
    {
      id: 6,
      name: "Retardio Cousins",
      symbol: "4442",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image/950e7eef-4da1-47b7-9dd9-507375b9e741",
      price: 5.23,
      sellPrice: 4.35,
      volume24h: 152.12,
      priceChange24h: 16.87,
      trades: 26,
      marketCap: 23241.87,
      totalVolume: 186790.15,
      listed: "12% [514]"
    },
    {
      id: 7,
      name: "Paradise",
      symbol: "8888",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image/9af29abd-bb0b-4bb0-8879-e811b4e60446",
      price: 9.09,
      sellPrice: 1.01,
      volume24h: 143.16,
      priceChange24h: -24.35,
      trades: 15,
      marketCap: 80806.14,
      totalVolume: 10771.16,
      listed: "0% [25]"
    },
    {
      id: 8,
      name: "Lifinity Flares",
      symbol: "9473",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image-7a811f33-1b06-41e0-8e5d-03463b29742d",
      price: 9.63,
      sellPrice: 8.16,
      volume24h: 138.34,
      priceChange24h: 12.78,
      trades: 16,
      marketCap: 91294.66,
      totalVolume: 177889.04,
      listed: "2% [167]"
    },
    {
      id: 9,
      name: "Claynosaurz",
      symbol: "10232",
      imageUri: "https://creator-hub-prod.s3.us-east-2.amazonaws.com/claynosaurz_pfp_1679930706147.jpeg",
      price: 11.42,
      sellPrice: 10.62,
      volume24h: 132.65,
      priceChange24h: -4.75,
      trades: 11,
      marketCap: 116902.64,
      totalVolume: 2083633.99,
      listed: "4% [426]"
    },
    {
      id: 7,
      name: "Paradise",
      symbol: "8888",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image/9af29abd-bb0b-4bb0-8879-e811b4e60446",
      price: 9.09,
      sellPrice: 1.01,
      volume24h: 143.16,
      priceChange24h: -24.35,
      trades: 15,
      marketCap: 80806.14,
      totalVolume: 10771.16,
      listed: "0% [25]"
    },
    {
      id: 8,
      name: "Lifinity Flares",
      symbol: "9473",
      imageUri: "https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/image-7a811f33-1b06-41e0-8e5d-03463b29742d",
      price: 9.63,
      sellPrice: 8.16,
      volume24h: 138.34,
      priceChange24h: 12.78,
      trades: 16,
      marketCap: 91294.66,
      totalVolume: 177889.04,
      listed: "2% [167]"
    },
    {
      id: 9,
      name: "Claynosaurz",
      symbol: "10232",
      imageUri: "https://creator-hub-prod.s3.us-east-2.amazonaws.com/claynosaurz_pfp_1679930706147.jpeg",
      price: 11.42,
      sellPrice: 10.62,
      volume24h: 132.65,
      priceChange24h: -4.75,
      trades: 11,
      marketCap: 116902.64,
      totalVolume: 2083633.99,
      listed: "4% [426]"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white mt-7">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-3xl font-mono mb-2">Solana's Leading Token Exchange</h1>
        <p className="text-gray-400 text-xs md:text-base">Fastest Data • Deepest Liquidity • Fun Rewards</p>
      </div>

      {/* Toggle */}
      {/* <div className="flex justify-center items-center gap-4 py-3">
        <button className="text-gray-400 text-lg">↺</button>
        <span className="text-gray-400 text-base">CARDS</span>
        <div className="w-14 h-7 bg-blue-500 rounded-full"></div>
        <span className="text-white text-base">TABLE</span>
        <button className="text-gray-400 text-lg">▲</button>
      </div> */}

      {/* Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-3 text-base gap-4">
        <div className="w-full md:w-auto flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 items-center">
          <button className="text-orange-500 text-sm hover:opacity-80">Trending</button>
          <button className="text-gray-400 text-sm hover:opacity-80">New Tokens</button>
          <button className="text-gray-400 text-sm hover:opacity-80">1h</button>
          <button className="text-orange-500 text-sm hover:opacity-80">24h</button>
          <button className="text-gray-400 text-sm hover:opacity-80">7d</button>
          <button className="text-gray-400 text-sm hover:opacity-80">See More</button>
        </div>
        
        <div className="w-full md:flex-1 md:mx-6">
          <input
            type="text"
            placeholder="Search by contract address, name, or symbol"
            className="w-full border border-gray-700 rounded text-gray-400 px-4 py-2 text-sm hover:border-orange-500 focus:outline-none focus:text-white focus:border-orange-500"
          />
        </div>

        <div className="w-full md:w-auto flex justify-center md:justify-end space-x-6">
          <button className="text-gray-400 text-sm hover:opacity-80 flex items-center gap-2">
            <HiAdjustments className="text-lg" /> Filters
          </button>
          <button className="text-gray-400 text-sm hover:opacity-80 flex items-center gap-2">
            <BiSortAlt2 className="text-lg" /> Sort By
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-2 md:px-6 overflow-x-auto">
        <div className="min-w-[1200px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="text-left py-3 px-2 font-normal w-[50px]">★</th>
                <th className="text-left px-2 font-normal w-[150px]">Token Ⓜ</th>
                <th className="text-right px-2 font-normal w-[50px]">Floor</th>
                <th className="text-right px-2 font-normal w-[100px]">Sell Now</th>
                <th className="text-right px-2 font-normal w-[100px]">24H Volume</th>
                <th className="text-right px-2 font-normal w-[100px]">24H Δ</th>
                <th className="text-right px-2 font-normal w-[100px]">Sales</th>
                <th className="text-right px-2 font-normal w-[100px]">Market Cap</th>
                <th className="text-right px-2 font-normal w-[100px]">Total Vol</th>
                <th className="text-right px-2 font-normal w-[100px]">Listed</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <tr key={token.id} className="border-b border-gray-800/50 hover:bg-[#1e2025]">
                  <td className="py-4 px-2 whitespace-nowrap">☆ {token.id}</td>
                  <td className="px-2">
                    <div className="flex items-center gap-2">
                      <img src={token.imageUri} alt={token.name} className="w-8 h-8 rounded" />
                      <div className="min-w-0">
                        <div className="text-white text-sm truncate">{token.name}</div>
                        <div className="text-gray-400 text-xs">{token.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right px-2 text-green-400 whitespace-nowrap">{token.price.toFixed(2)}</td>
                  <td className="text-right px-2 text-red-400 whitespace-nowrap">{token.sellPrice.toFixed(2)}</td>
                  <td className="text-right px-2 whitespace-nowrap">{token.volume24h.toLocaleString()}</td>
                  <td className={`text-right px-2 whitespace-nowrap ${token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {token.priceChange24h.toFixed(2)}%
                  </td>
                  <td className="text-right px-2 whitespace-nowrap">{token.trades}</td>
                  <td className="text-right px-2 whitespace-nowrap">{token.marketCap.toLocaleString()}</td>
                  <td className="text-right px-2 whitespace-nowrap">{token.totalVolume.toLocaleString()}</td>
                  <td className="text-right px-2 text-gray-400 whitespace-nowrap">{token.listed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Trade;