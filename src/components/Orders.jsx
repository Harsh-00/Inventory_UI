import React, { useState, useEffect } from 'react';
import OrderForm from './OrderForm';
import axios from 'axios';
import moment from 'moment';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showPastOrders, setShowPastOrders] = useState(false);
  const [products, setProducts] = useState([]);

  const order_url = import.meta.env.VITE_ORDER_ENDPOINT;
  const product_url = import.meta.env.VITE_PRODUCT_ENDPOINT;

  useEffect(() => {
    axios.get(`${product_url}/product/all`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
    
    axios.get(`${order_url}/orders/all`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Error fetching orders:', err));
  }, [showPastOrders]);

  const handlePlaceOrder = (orderData) => {
    const productExists = products.some(product => product.pk === orderData.product_id);
    if (!productExists) {
      alert('Invalid product ID. Please try again.');
      return;
    }

    axios.post(`${order_url}/orders`, orderData)
      .then((res) => {
        setOrders([...orders, res.data]);
        alert('Order placed successfully!');
      })
      .catch((err) => console.error('Error placing order:', err));
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  .map(order => (
                    <tr key={order.pk}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.pk}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{moment.utc(order.created_at).local().format('MMMM D, YYYY, h:mm A')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {products.find(p => p.pk === order.product_id)?.name ||(order?.product_name!==undefined?order.product_name:'Unknown')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.message}</td>
                      
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

