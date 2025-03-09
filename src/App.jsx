import React, { useEffect, useState } from 'react';
import Products from './components/Products';
import Orders from './components/Orders'; 
import axios from 'axios';

function App() {
  const [activeTab, setActiveTab] = useState('products'); 

  const order_url = import.meta.env.VITE_ORDER_ENDPOINT;
  const product_url = import.meta.env.VITE_PRODUCT_ENDPOINT;

  const [serviceStatus, setServiceStatus] = useState({
    service1: false,
    service2: false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)  

  const allServicesReady = serviceStatus.service1 && serviceStatus.service2
  const checkServicesHealth = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const service1Url = `${order_url}/health`
      const service2Url = `${product_url}/health`

      // Check both services in parallel
      const [service1Response, service2Response] = await Promise.all([
        axios.get(service1Url).then((res) => res.data?.status==='ok'), 
        axios.get(service2Url).then((res) => res.data?.status==='ok'), 
      ])

      setServiceStatus({
        service1: service1Response,
        service2: service2Response,
      })
    } catch (err) {
      setError("Failed to connect to services. Please try again.")
      console.error("Health check error:", err)
    } finally {
      setIsLoading(false)
    }
  }


 
  useEffect(() => {
    if (serviceStatus.service1 && serviceStatus.service2) return;

    // Function to check health of services
    checkServicesHealth()

    const intervalId = setInterval(() => {
      checkServicesHealth()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [serviceStatus.service1, serviceStatus.service2])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold text-white">Generic Inventory</h1>
        </div>
      </header>

      {
         !allServicesReady && (
          <main className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center w-full h-full pt-36 justify-center">
            <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8 text-center">
              <h2 className="text-2xl font-medium text-gray-800 mb-6">System Startup</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                  {error}
                  <button
                    onClick={checkServicesHealth}
                    className="mt-2 w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Service 1:</span>
                  <span className={`font-medium ${serviceStatus.service1 ? "text-green-600" : "text-yellow-600"}`}>
                    {serviceStatus.service1 ? "Ready" : "Starting..."}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Service 2:</span>
                  <span className={`font-medium ${serviceStatus.service2 ? "text-green-600" : "text-yellow-600"}`}>
                    {serviceStatus.service2 ? "Ready" : "Starting..."}
                  </span>
                </div>
              </div>

              {isLoading && (
                <div className="flex justify-center mb-6">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}

              {allServicesReady ? (
                <button 
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  Continue to Application
                </button>
              ) : (
                <div className="text-gray-600">
                  <p className="mb-2">Please wait while services are starting...</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>
          </main>
        )
      }

      {
          allServicesReady && (
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
        )
      }
    </div>
  );
}

export default App;

