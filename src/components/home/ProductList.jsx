import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
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
  ];

  return (
    <>
      <section className="mx-auto mt-4 w-full">
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
          {featuredProductsDiv.map(({ name, image }, idx) => {
            return (
              <div key={idx} className="w-full bg-white p-4">
                <h1 className="mb-2 w-full text-2xl font-bold">{name}</h1>
                <div className="grid grid-cols-2 gap-2 py-2">
                  <div>
                    <Link className="inline-block h-[23vh] w-full overflow-hidden">
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full transform object-cover duration-150 hover:scale-110 hover:cursor-pointer"
                      />
                    </Link>
                    <h1 className="py-2 text-sm font-semibold">{name}</h1>
                  </div>
                  <div>
                    <Link className="inline-block h-[23vh] w-full overflow-hidden">
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full transform object-cover duration-150 hover:scale-110 hover:cursor-pointer"
                      />
                    </Link>
                    <h1 className="py-2 text-sm font-semibold">{name}</h1>
                  </div>
                  <div>
                    <Link className="inline-block h-[23vh] w-full overflow-hidden">
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full transform object-cover duration-150 hover:scale-110 hover:cursor-pointer"
                      />
                    </Link>
                    <h1 className="py-2 text-sm font-semibold">{name}</h1>
                  </div>
                  <div>
                    <Link className="inline-block h-[23vh] w-full overflow-hidden">
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full transform object-cover duration-150 hover:scale-110 hover:cursor-pointer"
                      />
                    </Link>
                    <h1 className="py-2 text-sm font-semibold">{name}</h1>
                  </div>
                </div>
                <Link className="text-md transform font-semibold text-blue-600 underline duration-200 hover:font-bold">
                  See All <ArrowRight size={15} className="mb-1 inline" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
