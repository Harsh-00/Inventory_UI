import React, { useState } from 'react';

function OrderForm({ onSubmit, products }) {
  const [formData, setFormData] = useState({ product_id: '', quantity: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ product_id: '', quantity: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50 p-6 border border-blue-100">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Place an Order</h3>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">Product</label>
          <select
            id="product_id"
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.pk} value={product.pk}>{product.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 transition-colors duration-200"
        >
          Place Order
        </button>
      </div>
    </form>
  );
}

export default OrderForm;

