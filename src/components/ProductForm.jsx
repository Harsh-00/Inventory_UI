import React, { useState, useEffect } from 'react';

function ProductForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({ name: '', price: '', quantity: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setIsEditing(true);
    } else {
      setFormData({ name: '', price: '', quantity: '' });
      setIsEditing(false);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', price: '', quantity: '' });
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData({ name: '', price: '', quantity: '' });
    setIsEditing(false);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50 p-6 border border-blue-100">
      <h3 className="text-lg font-medium text-gray-900 mb-4"> 
        {isEditing ? 'Update Product' : 'Add New Product'}
      </h3>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
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
      <div className="mt-6 flex justify-end">
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="mr-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 transition-colors duration-200"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 transition-colors duration-200"
        >
          {isEditing ? 'Submit Update' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;

