import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';

function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Fetch products from your API here
    // For now, we'll use dummy data
    setProducts([
      { pk: "01JFZMZ4SH1Z2GP30N7BW8X66B", name: "Executive Chair", price: 300, quantity: 2 },
      { pk: "02ABCDEFGHIJKLMNOPQRSTUVWX", name: "Conference Table", price: 500, quantity: 1 },
    ]);
  }, []);

  const handleDelete = (pk) => {
    // Implement delete logic here
    setProducts(products.filter(product => product.pk !== pk));
  };

  const handleUpdate = (updatedProduct) => {
    // Implement update logic here
    setProducts(products.map(product => 
      product.pk === updatedProduct.pk ? updatedProduct : product
    ));
    setEditingProduct(null);
  };

  const handleAdd = (newProduct) => {
    // Implement add logic here
    setProducts([...products, { ...newProduct, pk: Date.now().toString() }]);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Management</h2>
      <ProductForm onSubmit={editingProduct ? handleUpdate : handleAdd} initialData={editingProduct} />
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

