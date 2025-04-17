import React, { useState } from "react";

// Extend the Window interface to include ethereum and solana properties
declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
  }
}

const Header: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // const connectWallet = async (selectedChain: "ethereum" | "solana") => {
  //   if (selectedChain === "solana" && window.solana && window.solana.isPhantom) {
  //     try {
  //       const response = await window.solana.connect();
  //       const address = response.publicKey.toString();
  //       const message = `Sign this message to log in: ${new Date().toISOString()}`;
  //       const encodedMessage = new TextEncoder().encode(message);
  //       const signedMessage = await window.solana.signMessage(encodedMessage, "utf8");
  //       const signature = btoa(String.fromCharCode(...signedMessage.signature));

  //       setWalletAddress(address);

  //       await fetch("/api/auth/web3-login", {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           address,
  //           signature,
  //           message,
  //           chain: "solana",
  //         }),
  //       })
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error(`Server responded with status ${response.status}`);
  //           }
  //           return response.json();
  //         })
  //         .catch((error) => {
  //           console.error("CORS or server error:", error);
  //           alert("Failed to connect to the server. Please check your network or server configuration.");
  //         });
  //     } catch (error) {
  //       console.error("Failed to connect Solana wallet:", error);
  //     }
  //   } else if (selectedChain === "ethereum" && window.ethereum) {
  //     console.log("Attempting to connect wallet", { 
  //       selectedChain, 
  //       windowEthereum: window.ethereum, 
  //       isEthereum: !!window.ethereum 
  //     });
    
  //     try {
  //       if (!window.ethereum.isMetaMask) {
  //         throw new Error("Detected wallet is not MetaMask!");
  //       }
  //       console.log("MetaMask detected", window.ethereum.isMetaMask);
  //       // Taruh eth_requestAccounts di dalam try/catch
  //       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  //       console.log("MetaMask detected 2", window.ethereum.isMetaMask);
  //       console.log("Accounts:", accounts);
        
  //       const address = accounts[0];
  //       const message = `Sign this message to log in: ${new Date().toISOString()}`;
  //       const signature = await window.ethereum.request({
  //         method: "personal_sign",
  //         params: [message, address],
  //       });
  
  //       setWalletAddress(address);
  //       console.log("Wallet connected:", address);
  
  //       await fetch("/api/auth/web3-login", {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           address,
  //           signature,
  //           message,
  //           chain: "ethereum",
  //         }),
  //       })
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error(`Server responded with status ${response.status}`);
  //           }
  //           return response.json();
  //         })
  //         .then((data) => console.log("Server response:", data))
  //         .catch((error) => {
  //           console.error("CORS or server error:", error);
  //           alert("Failed to connect to the server. Please check your network or server configuration.");
  //         });
  //     } catch (error) {
  //       console.error("Failed to connect Ethereum wallet:", error);
  //     }
  //   } else {
  //     alert(`No ${selectedChain} wallet found. Please install a compatible wallet (e.g., MetaMask for Ethereum, Phantom for Solana).`);
  //   }
  // };


  const connectWallet = async (selectedChain: "ethereum" | "solana") => {
    if (selectedChain === "solana" && window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        const address = response.publicKey.toString();
        const message = `Sign this message to log in: ${new Date().toISOString()}`;
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await window.solana.signMessage(encodedMessage, "utf8");
        const signature = btoa(String.fromCharCode(...signedMessage.signature));
  
        setWalletAddress(address);
  
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
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Server responded with status ${response.status}`);
            }
            return response.json();
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

  return (
    <div className="relative">
      {/* Header */}
      <header className="flex justify-between items-center px-2.5 py-1.5 h-14 bg-dark-bg border-b border-gray-700 z-50">
        <div className="text-2xl font-bold text-orange-500">Ape.Pro</div>
        <nav className="space-x-4">
          {walletAddress ? (
            <span className="text-sm text-orange-500 font-bold">{walletAddress}</span>
          ) : (
            <button
              onClick={openModal}
              className="px-4 py-2 bg-orange-500 text-sm text-amber-950 font-bold rounded-lg hover:bg-orange-400 transition"
            >
              Login
            </button>
          )}
        </nav>
      </header>

      {/* Modal for login options */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-start justify-center bg-[#1e2025]/75 backdrop-blur-[1px] z-40 pt-16">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-96 text-white z-50">
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