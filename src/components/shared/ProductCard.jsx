import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductCard = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/personal-care`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  const addToCart = () => {
    onAddToCart(product);
    navigate("/cart");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
        &larr; Back
      </button>
      {product.map(({ image, name, category, price, description }, idx) => {
        return (
          <div
            key={idx}
            className=" bg-sky-600 flex flex-col md:flex-row gap-8 text-black ">
            <img src={image} alt={name} className="h-64 object-contain rounded" />
            <div>
              <h2 className="text-3xl font-bold mb-2">{name}</h2>
              <p className="text-gray-500 mb-2">{category}</p>
              <p className="text-xl font-bold text-blue-600 mb-4">${price}</p>
              <p className="mb-6">{description}</p>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )

      })}
    </div>
  );
};

export default ProductCard;
