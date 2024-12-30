import React, { useState } from 'react';

function OrderForm({ onSubmit, products }) {
  const [formData, setFormData] = useState({ product_id: '', quantity: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'product_id') {
      const product = products.find(p => p.pk === value);
      setSelectedProduct(product);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totals = calculateTotal();
    if (totals) {
      onSubmit({ ...formData, ...totals });
    }
    setFormData({ product_id: '', quantity: '' });
    setSelectedProduct(null);
  };

  const calculateTotal = () => {
    if (!selectedProduct || !formData.quantity) return null;
    const itemPrice = selectedProduct.price * formData.quantity;
    const platformFee = itemPrice * 0.05; // 5% platform fee
    const total = itemPrice + platformFee;
    return { itemPrice, platformFee, total };
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
      {
        selectedProduct && formData.quantity && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h4 className="text-lg font-medium text-gray-900 mb-2">Order Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Item Price:</span>
            <span>${(selectedProduct.price * formData.quantity).toFixed(2)}</span>
            <span>Platform Fee (10%):</span>
            <span>${(selectedProduct.price * formData.quantity * 0.1).toFixed(2)}</span>
            <span className="font-bold">Total Payment:</span>
            <span className="font-bold">${((selectedProduct.price * formData.quantity) * 1.1).toFixed(2)}</span>
          </div>
        </div>
      )}
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

