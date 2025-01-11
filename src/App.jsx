import React, { useState } from 'react';
import Products from './components/Products';
import Orders from './components/Orders';

function App() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold text-white">Generic Inventory</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'products' ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'orders' ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
          </div>
          <div className="p-6">
            {activeTab === 'products' ? <Products /> : <Orders />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

