import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import WalletIcon from "../../assets/img/wallet.svg";
import SolIcon from "../../assets/img/sol-logo.svg";
import ProfileSidebar from "./ProfileSidebar";
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
  }
}

interface LoginResponse {
  code: number;
  data: {
    token: string;
    user: {
      id: number;
      active: boolean;
      created_at: number;
      updated_at: number;
    }
  }
}

const Header: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname){
      case '/trade':
        setSelectedMenu("trade");
        break;
      case '/create':
        setSelectedMenu("create");
        break;
      case '/swap':
        setSelectedMenu("swap");
        break;
      case '/portfolio':
        setSelectedMenu("portfolio");
        break;
      default:
        setSelectedMenu(null)
    }
  }, [location.pathname])

  useEffect(() => {
    const savedWalletData = localStorage.getItem('pumpAuthData');

    if(savedWalletData) {
      const walletData = JSON.parse(savedWalletData);
      setWalletAddress(walletData.address);
      setBalance(walletData.balance || 0);
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isProfileOpen && !(event.target as Element).closest('.profile-sidebar')) {
        setIsProfileOpen(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const connectWallet = async (selectedChain: "ethereum" | "solana") => {
    if (selectedChain === "solana" && window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        const address = response.publicKey.toString();
        const message = `Sign this message to log in: ${new Date().toISOString()}`;
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await window.solana.signMessage(encodedMessage, "utf8");
        const signature = btoa(String.fromCharCode(...signedMessage.signature));
        const solConnection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const balance = await solConnection.getBalance(new PublicKey(address));
        
        setWalletAddress(address);
        setBalance(balance/LAMPORTS_PER_SOL);
  
        await fetch("/api/auth/web3-login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
            signature,
            message,
            chain: "solana",
          }),
        })
          .then(async(response) => {
            if (!response.ok) {
              throw new Error(`Server responded with status ${response.status}`);
            }
            const loginData: LoginResponse = await response.json();
            const walletData = {
              address,
              balance,
              chain:selectedChain,
              token: loginData.data.token,
              user: loginData.data.user
            };

            localStorage.setItem('pumpAuthData', JSON.stringify(walletData));
            return loginData
          })
          .catch((error) => {
            console.error("CORS or server error:", error);
            alert("Failed to connect to the server. Please check your network or server configuration.");
          });
      } catch (error) {
        console.error("Failed to connect Solana wallet:", error);
      }
    } else if (selectedChain === "ethereum" && window.ethereum) {
      console.log("Attempting to connect wallet", { 
        selectedChain, 
        windowEthereum: window.ethereum, 
        isEthereum: !!window.ethereum 
      });
      
      try {
        if (!window.ethereum.isMetaMask) {
          throw new Error("Detected wallet is not MetaMask!");
        }
        console.log("MetaMask detected", window.ethereum.isMetaMask);
        
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("MetaMask detected 2", window.ethereum.isMetaMask);
        console.log("Accounts:", accounts);
        
        const address = accounts[0];
        const message = `Sign this message to log in: ${new Date().toISOString()}`;
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, address],
        });
  
        setWalletAddress(address);
        console.log("Wallet connected:", address);
  
        await fetch("/api/auth/web3-login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
            signature,
            message,
            chain: "ethereum",
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Server responded with status ${response.status}`);
            }
            return response.json();
          })
          .then((data) => console.log("Server response:", data))
          .catch((error) => {
            console.error("CORS or server error:", error);
            alert("Failed to connect to the server. Please check your network or server configuration.");
          });
      } catch (error) {
        console.error("Failed to connect Ethereum wallet:", error.message || error);
      }
    } else {
      alert(`No ${selectedChain} wallet found. Please install a compatible wallet (e.g., MetaMask for Ethereum, Phantom for Solana).`);
    }
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Placeholder functions for social logins
  const loginWithGoogle = () => {
    alert("Google login not implemented yet.");
    closeModal();
  };

  const loginWithTwitter = () => {
    alert("Twitter login not implemented yet.");
    closeModal();
  };

  const loginWithDiscord = () => {
    alert("Discord login not implemented yet.");
    closeModal();
  };

  const handleLogout = () => {
    setWalletAddress(null);
    setBalance(0);
    setIsProfileOpen(false);
    localStorage.removeItem('pumpAuthData');
  };

  return (
    <div className="relative">
      {/* Header */}
      <header className="flex justify-between items-center px-2.5 py-1.5 h-14 bg-dark-bg border-b border-gray-800 z-50">
        <div className="flex items-center">
          <Link 
            to="/"
            onClick={() => setSelectedMenu("home")}
            className="text-md font-bold text-white"
          >
            Bumiswap
          </Link>
          <div className="ml-6">
            <Link
              to="/trade"
              onClick={() => setSelectedMenu("trade")}
              className={`px-2 py-2 ${selectedMenu === "trade" ? "text-orange-500" : "text-white"} text-sm text-orange-500 font-bold rounded-lg transition`}
            >
              Trade
            </Link>
            <Link
              to="/create"
              onClick={() => setSelectedMenu("create")}
              className={`px-2 py-2 ${selectedMenu === "create" ? "text-orange-500" : "text-white"} text-sm text-orange-500 font-bold rounded-lg transition`}
            >
              Create
            </Link>
            <Link
              to="/swap"
              onClick={() => setSelectedMenu("swap")}
              className={`px-2 py-2 ${selectedMenu === "swap" ? "text-orange-500" : "text-white"} text-sm text-orange-500 font-bold rounded-lg transition`}
            >
              Swap
            </Link>
            <Link
              to="/portfolio"
              onClick={() => setSelectedMenu("portfolio")}
              className={`px-2 py-2 ${selectedMenu === "portfolio" ? "text-orange-500" : "text-white"} text-sm text-orange-500 font-bold rounded-lg transition`}
            >
              Portfolio
            </Link>
          </div>
        </div>
        <nav className="space-x-4">
          {walletAddress ? (
            <div className="relative">
              <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 bg-[#1e2025] px-3 py-1.5 rounded-lg border border-gray-800">
                {/* Wallet Icon */}
                <img src={WalletIcon} alt="Wallet" className="w-5 h-5 filter brightness-0 invert opacity-50" />
                
                <span className="text-sm text-white">{balance}</span>
                
                {/* Solana Icon */}
                <img src={SolIcon} alt="Wallet" className="w-4 h-4" />

                
                <button 
                  className="text-gray-400 hover:text-gray-300"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </div>
              <ProfileSidebar
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                walletAddress={walletAddress}
                balance={balance}
                onLogout={handleLogout}
              />
            </div>
          ) : (
            <button
              onClick={openModal}
              className="px-4 py-2 bg-orange-500 text-sm text-amber-950 font-bold rounded-lg hover:bg-orange-400 transition"
            >
              Connect
            </button>
          )}
        </nav>
      </header>

      {/* Modal for login options */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-start justify-center bg-[#1e2025]/75 backdrop-blur-[1px] z-40 pt-16">
          <div className="bg-black border border-gray-800 rounded-lg p-6 w-96 text-white z-50">
            {/* Social Logins Section */}
            <h2 className="text-lg font-semibold mb-2">Login via Socials</h2>
            <p className="text-sm text-gray-400 mb-4">
              The email address of your social account determines your Ape account. Changing to a different email will result in a different Ape account.
            </p>
            <button
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center py-2 mb-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
            <div className="flex space-x-2 mb-4">
              <button
                onClick={loginWithTwitter}
                className="w-full flex items-center justify-center py-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <img src="https://www.twitter.com/favicon.ico" alt="Twitter" className="w-5 h-5 mr-2" />
                Twitter
              </button>
              <button
                onClick={loginWithDiscord}
                className="w-full flex items-center justify-center py-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <img src="discord.svg" alt="Discord" className="w-5 h-5 mr-2" />
                Discord
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">OR</span>
              </div>
            </div>

            {/* Web3 Logins Section */}
            <h2 className="text-lg font-semibold mb-2">Login via Web3</h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  connectWallet("solana");
                  closeModal();
                }}
                className="flex items-center justify-center py-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <img src="phantom.svg" alt="Phantom" className="w-5 h-5 mr-2" />
                Phantom
              </button>
              <button
                onClick={() => {
                  connectWallet("solana");
                  closeModal();
                }}
                className="flex items-center justify-center py-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <img src="solflare.svg" alt="Solflare" className="w-5 h-5 mr-2" />
                Solflare
              </button>
              <button
                onClick={() => {
                  connectWallet("solana");
                  closeModal();
                }}
                className="flex items-center justify-center py-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <img src="backpack.ico" alt="Backpack" className="w-5 h-5 mr-2" />
                Backpack
              </button>
              <button
                onClick={() => {
                  connectWallet("ethereum");
                  closeModal();
                }}
                className="flex items-center justify-center py-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <img src="metamask.svg" alt="MetaMask" className="w-5 h-5 mr-2" />
                MetaMask
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="mt-4 w-full py-2 border border-primary rounded-lg hover:bg-gray-800 active:!text-neutral-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;