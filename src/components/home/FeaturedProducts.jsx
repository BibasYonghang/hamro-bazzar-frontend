import React, { useState, useEffect } from "react";

export default function FeaturedProducts() {
  // const [product, setProduct] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:5000/api/personal-care`);
  //       const data = await res.json();
  //       setProduct(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProduct();
  // }, []);

  const featuredProductsDiv = [
    {
      name: "Electronics",
      image: "/featured-products-image/electronics.png",
    },
    {
      name: "Personal Care",
      image: "/featured-products-image/personal-care.png",
    },
    {
      name: "Gaming",
      image: "/featured-products-image/gaming.png",
    },
    {
      name: "Home Furniture",
      image: "/featured-products-image/home-furniture.png",
    },
    {
      name: "Gaming",
      image: "/featured-products-image/gaming.png",
    },
    {
      name: "Home Furniture",
      image: "/featured-products-image/home-furniture.png",
    },
  ];

  // if (loading) return <div>Loading...</div>;
  // if (!product) return <div>Product not found.</div>;

  return (
    <>
      <section className="mx-auto mt-4 w-full bg-white p-2 px-3">
        <h2 className="mb-2 text-xl font-bold">Featured Products</h2>
        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 xl:grid-cols-6">
          {featuredProductsDiv.map(({ name, image }, idx) => {
            return (
              <div key={idx} className="w-full">
                <img
                  src={image}
                  alt={name}
                  className="h-[30vh] w-full bg-contain hover:cursor-pointer"
                />
                <h1 className="mt-2 w-full font-semibold">{name}</h1>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

{
  /* <div className="rounded bg-white p-6 shadow">
            {product.map(({ image, name, category, price, description }, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-8 bg-blue-600 text-black md:flex-row"
                >
                  <img
                    src={image}
                    alt={name}
                    className="h-64 rounded object-contain"
                  />
                  <div>
                    <h2 className="mb-2 text-3xl font-bold">{name}</h2>
                    <p className="mb-2 text-gray-500">{category}</p>
                    <p className="mb-4 text-xl font-bold text-blue-600">
                      ${price}
                    </p>
                    <p className="mb-6">{description}</p>
                    <button className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div> */
}
