import React, { useState } from 'react'

const Create: React.FC = () => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [formData, setFormData] = useState({
    chain: 'Solana',
    name: '',
    ticker: '',
    description: '',
    image: null as File | null,
    telegram: '',
    website: '',
    twitter: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const clearForm = () => {
    setFormData({
      chain: 'Solana',
      name: '',
      ticker: '',
      description: '',
      image: null,
      telegram: '',
      website: '',
      twitter: ''
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-[#120d0d] via-[#241a1a] to-[#120d0d]">
      <div className="w-full max-w-2xl bg-black rounded-lg p-6">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-lg font-bold text-white text-center">Create Token</h1>
        </div>
        <div className='flex justify-end mb-6'>
          <button 
            onClick={clearForm}
            className="flex items-center gap-2 text-gray-400 text-sm hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear Form
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Chain Selection */}
          {/* <div>
            <label className="block text-white mb-2">Chain</label>
            <div className="flex items-center space-x-2 p-2 bg-[#1e2025] rounded-lg w-fit">
              <div className="bg-green-500 rounded-full w-5 h-5"></div>
              <span className="text-white">Solana</span>
            </div>
          </div> */}

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm text-white mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="The Bumi"
              autoComplete="off"
              className="w-full text-sm p-2 bg-[#1e2025] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Ticker Input */}
          <div>
            <label htmlFor="ticker" className="block text-white text-sm mb-2">Ticker</label>
            <input
              type="text"
              id="ticker"
              name="ticker"
              value={formData.ticker}
              onChange={handleInputChange}
              placeholder="BUMI"
              autoComplete="off"
              className="w-full text-sm p-2 bg-[#1e2025] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Collection Image */}
          <div>
            <label className="block text-white mb-2 text-sm">Collection Image</label>
            <p className="text-sm text-gray-400 mb-2">Image that will be shown as the main image for the collection. Recommended: 800×800px jpg</p>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center">
                <svg className="w-8 h-8 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-center text-gray-400 mb-4">Drop your artwork here to upload</p>
                <button
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="text-sm px-4 py-2 bg-[#1e2025] text-white rounded-lg hover:bg-gray-700"
                >
                  Choose Image...
                </button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-white text-sm mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="e.g. The Pond is the greatest collection ever made"
              autoComplete="off"
              className="w-full text-sm p-2 bg-[#1e2025] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500 min-h-[100px]"
            />
          </div>

          {/* Show More Options */}
          <div>
            <button
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="flex items-center text-orange-500 hover:text-orange-400"
            >
              <span className="mr-2 text-sm">{showMoreOptions ? 'Hide' : 'Show'} More Options</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${showMoreOptions ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Additional Options */}
          {showMoreOptions && (
            <div className="space-y-6">
              {/* Telegram Link */}
              <div>
                <label htmlFor="telegram" className="block text-sm text-white mb-2">Telegram Link</label>
                <input
                  type="url"
                  id="telegram"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  placeholder="https://t.me/yourgroup"
                  autoComplete="off"
                  className="w-full p-2 bg-[#1e2025] text-sm border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Website Link */}
              <div>
                <label htmlFor="website" className="block text-sm text-white mb-2">Website Link</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                  autoComplete="off"
                  className="w-full text-sm p-2 bg-[#1e2025] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Twitter Link */}
              <div>
                <label htmlFor="twitter" className="block text-sm text-white mb-2">Twitter Link</label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/youraccount"
                  autoComplete="off"
                  className="w-full text-sm p-2 bg-[#1e2025] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}

          <div className="mt-8">
            <button
              type="submit"
              className="w-full text-sm py-2 px-4 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition duration-200"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Create Token
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Create;