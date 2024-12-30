import React, { useState, useEffect } from 'react';
import OrderForm from './OrderForm';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showPastOrders, setShowPastOrders] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your API here
    // For now, we'll use dummy data
    setProducts([
      { pk: "01JFZMZ4SH1Z2GP30N7BW8X66B", name: "Executive Chair" },
      { pk: "02ABCDEFGHIJKLMNOPQRSTUVWX", name: "Conference Table" },
    ]);

    // Fetch past orders from your API here
    // For now, we'll use dummy data
    setOrders([
      { id: 1, product_id: "01JFZMZ4SH1Z2GP30N7BW8X66B", quantity: 2 },
      { id: 2, product_id: "02ABCDEFGHIJKLMNOPQRSTUVWX", quantity: 1 },
    ]);
  }, []);

  const handlePlaceOrder = (orderData) => {
    // Check if the product exists
    const productExists = products.some(product => product.pk === orderData.product_id);
    if (!productExists) {
      alert('Invalid product ID. Please try again.');
      return;
    }

    // Implement order placement logic here
    // For now, we'll just add it to the orders array
    setOrders([...orders, { id: Date.now(), ...orderData }]);
    alert('Order placed successfully!');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Management</h2>
      <OrderForm onSubmit={handlePlaceOrder} products={products} />
      <div className="mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 transition-colors duration-200"
          onClick={() => setShowPastOrders(!showPastOrders)}
        >
          {showPastOrders ? 'Hide Past Orders' : 'Show Past Orders'}
        </button>
        {showPastOrders && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Past Orders</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {products.find(p => p.pk === order.product_id)?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;

