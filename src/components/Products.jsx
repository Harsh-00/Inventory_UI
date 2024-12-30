import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const product_url=import.meta.env.VITE_PRODUCT_ENDPOINT;

  useEffect(() => {
    axios.get(`${product_url}/product/all`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleDelete = (pk) => {
    axios.delete(`${product_url}/product/${pk}`)
      .then(() => setProducts(products.filter(product => product.pk !== pk)))
      .catch((err) => console.error('Error deleting product:', err));
  };

  const handleUpdate = (updatedProduct) => {
    axios.put(`${product_url}/product/${updatedProduct.pk}`, updatedProduct)
      .then(() => {
        setProducts(products.map(product => 
          product.pk === updatedProduct.pk ? updatedProduct : product
        ));
        setEditingProduct(null);
      })
      .catch((err) => console.error('Error updating product:', err));
  };

  const handleAdd = (newProduct) => {
    axios.post(`${product_url}/product`, newProduct)
      .then((res) => setProducts([...products, res.data]))
      .catch((err) => console.error('Error adding product:', err));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Management</h2>
      <ProductForm 
        onSubmit={editingProduct ? handleUpdate : handleAdd} 
        initialData={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />
      <div className="mt-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.pk}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-4"
                    onClick={() => setEditingProduct(product)}
                  >
                    Update
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(product.pk)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;

