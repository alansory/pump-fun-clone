import React from 'react'

interface LoginModalProps {
  isOpen: boolean,
  onClose: () => void,
  onConnectWallet: (chain: "solana" | "ethereum") => void;
  onLoginWithGoogle: () => void;
  onLoginWithTwitter: () => void;
  onLoginWithDiscord: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onConnectWallet,
  onLoginWithGoogle,
  onLoginWithTwitter,
  onLoginWithDiscord
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-[#1e2025]/75 backdrop-blur-[1px] z-40 pt-16">
      <div className="bg-black border border-gray-800 rounded-lg p-6 w-96 text-white z-50">
        {/* Social Login Section */}
        <h2 className="text-lg font-semibold mb-2">Login via Socials</h2>
        <p className="text-sm text-gray-400 mb-4">
          The email address of your social account determines your Ape account. Changing to a different email will result in a different Ape account.
        </p>
        <button
          onClick={onLoginWithGoogle}
          className="w-full flex items-center justify-center py-2 mb-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
        <div className="flex space-x-2 mb-4">
          <button
            onClick={onLoginWithTwitter}
            className="w-full flex items-center justify-center py-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <img src="https://www.twitter.com/favicon.ico" alt="Twitter" className="w-5 h-5 mr-2" />
            Twitter
          </button>
          <button
            onClick={onLoginWithDiscord}
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
              onConnectWallet("solana");
              onClose();
            }}
            className="flex items-center justify-center py-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <img src="phantom.svg" alt="Phantom" className="w-5 h-5 mr-2" />
            Phantom
          </button>
          <button
            onClick={() => {
              onConnectWallet("solana");
              onClose();
            }}
            className="flex items-center justify-center py-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <img src="solflare.svg" alt="Solflare" className="w-5 h-5 mr-2" />
            Solflare
          </button>
          <button
            onClick={() => {
              onConnectWallet("solana");
              onClose();
            }}
            className="flex items-center justify-center py-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <img src="backpack.ico" alt="Backpack" className="w-5 h-5 mr-2" />
            Backpack
          </button>
          <button
            onClick={() => {
              onConnectWallet("ethereum");
              onClose();
            }}
            className="flex items-center justify-center py-2 bg-primary border border-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <img src="metamask.svg" alt="MetaMask" className="w-5 h-5 mr-2" />
            MetaMask
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 border border-primary rounded-lg hover:bg-gray-800 active:!text-neutral-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default LoginModal;