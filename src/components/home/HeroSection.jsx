import React from 'react'
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const categories = [
    {
      name: "Hiking Gear",
      image: "/categories-image/hiking-gear.png",
      link: "/category/hiking-gear",
    },
    {
      name: "Backpacks",
      image: "/categories-image/backpacks.png",
      link: "/category/backpacks",
    },
    {
      name: "Camping Essentials",
      image: "/categories-image/camping.png",
      link: "/category/camping",
    },
    {
      name: "Footwear",
      image: "/categories-image/footwear.png",
      link: "/category/footwear",
    },
  ];
  return (
    <div className='relative
    xl:h-[88vh] sm:h-[120vh]  h-[165vh]
    '>
      <section className="h-full  w-full  rounded-lg 
      ">
        <img src="/component-image/home-bg-image.png" alt="" className='h-full w-full object-cover object-[center_70%]' />
        <div className='absolute z-40 top-12 w-full flex flex-col  items-center justify-center'>
          <h1 className="font-bold mb-4 text-blue-700
          lg:text-5xl sm:text-4xl text-2xl
          ">Welcome to Hamro Bazzar</h1>
          <p className=" text-blue-700 mb-6 text-center
          lg:text-xl sm:text-lg text-base
          ">Your one-stop shop for the best products at unbeatable prices!</p>
          <a href="/shop" className="inline-block bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">Shop Now</a>
        </div>

      </section>

      <div className="absolute bottom-30 z-10 h-[40vh] w-full bg-gradient-to-t from-white/100 via-white/0 to-transparent px-[3vw]">
      </div>
      <div className='absolute bottom-0  bg-white h-[20vh] w-full'>

      </div>

      <div className="absolute bottom-0 z-20 w-full px-[3vw] grid  
      xl:grid-cols-4 sm:grid-cols-2 grid-cols-1
      sm:gap-6 gap-4
      ">
        {categories.map((cat, idx) => (
          <Link
            to={cat.link}
            key={idx}
            className="group relative shadow-2xl bg-white  transition
            lg:h-[50vh] sm:h-[40vh]  h-[30vh] 
            sm:p-3 p-2"
          >
            <div className="relative h-[85%] w-full overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover object-[center_90%] group-hover:scale-105 transition duration-300"
              />
              {/* Overlay stays behind the text */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition z-10" />
              {/* Text goes above the overlay */}

            </div>
            <p className="absolute  left-3 font-semibold text-black z-20
            sm:bottom-4 bottom-2
            sm:text-lg text-base
            ">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

