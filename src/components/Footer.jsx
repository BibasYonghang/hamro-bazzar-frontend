// Footer.jsx
import { Mail, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import React from 'react';

const Footer = () => {
  const socialMediaIconsClass = "bg-blue-600 rounded-full  text-white p-1 h-8 w-8"
  const socialMediaIcons = [
    { path: "", icon: FaFacebook },
    { path: "", icon: FaInstagram },
    { path: "", icon: FaLinkedin },
    { path: "", icon: FaTwitter },
  ]
  return (
    <footer className="relative  w-full text-blue-800 mt-10
    lg:h-[70vh] md:h-[80vh] h-[98vh] 
    ">
      <div className='absolute w-full h-20 bg-gradient-to-br from-white to-transparent'></div>
      <img src="/footer-background.png" alt="" className=' h-full w-full object-cover object-[center_10%]' />
      <img src="/hamro-bazzar-logo.png" alt="" className='absolute top-3
       lg:h-40 md:h-35 h-30
       ' />
      <div
        className="absolute z-20 flex gap-3 mt-10 pl-9
        lg:top-37 md:top-56 sm:top-107 top-114
    ">
        {socialMediaIcons.map(({ path, icon: Icons }, idx) => (

          <a
            key={idx}
            href={path}
          >
            <Icons className={socialMediaIconsClass} />
          </a>

        ))}
      </div>
      <div className='absolute w-full 
      lg:top-16 md:top-14 top-30
      lg:flex grid grid-cols-2 
      lg:justify-end 
      xl:gap-32 lg:gap-14 md:gap-12 gap-8
      xl:pr-10 lg:pr-7 
      lg:pl-0 md:pl-65 pl-8
      '>
        <div className=' flex flex-col 
        sm:gap-4 gap-2
        '>
          <h1 className='font-bold
          sm:text-2xl text-xl 
          '>Contact Us</h1>
          <a href="" className='hover:text-blue-700 hover:underline text-lg hover:font-bold '><Phone size={window.innerWidth < 640 ? 15 : 20} className='inline md:mr-4 mr-1' /> 9808102206</a>
          <a href="" className='hover:text-blue-700 hover:underline text-lg ld '><Mail size={window.innerWidth < 640 ? 15 : 20} className='inline md:mr-4 mr-1' /> hmrobzr@gmail.com</a>
          <a href="" className='hover:text-blue-700 hover:underline text-lg hover:font-bold '><FaWhatsapp size={window.innerWidth < 640 ? 15 : 20} className='inline md:mr-4 mr-1' /> Whatsapp</a>
        </div>

        <div
          className='flex flex-col 
           md:gap-4 gap-2
           '>
          <h1 className='font-bold
          sm:text-2xl text-xl 
          '>Information</h1>
          <a href="" className='hover:text-blue-700 hover:underline text-lg hover:font-bold '>About Us</a>
          <a href="" className='hover:text-blue-700 hover:underline text-lg hover:font-bold '>Blog</a>
          <a href="" className='hover:text-blue-700 hover:underline text-lg hover:font-bold '>Testimonials</a>
        </div>
        <div
          className='flex flex-col
           md:gap-4 gap-2
           sm:mt-0 mt-3
          '>
          <h1 className='font-bold
          sm:text-2xl text-xl 
          '>Helpful Links</h1>
          <a href="" className='hover:text-blue-700 hover:underline text-lg hover:font-bold '>Service</a>
          <a href="" className='hover:text-blue-700 hover:underline text-lg hover:font-bold '>Supports</a>
          <a href="" className='hover:text-blue-700 hover:underline text-lg hover:font-bold '>Terms & Condition</a>
        </div>
        <div
          className='flex flex-col 
           md:gap-4 gap-2
           sm:mt-0 mt-3
          '>
          <h1 className='font-bold
          sm:text-2xl text-xl 
          '>Our Services</h1>
          <a href="" className='hover:text-blue-700 hover:underline text-lg hover:font-bold '>Brand</a>
          <a href="" className='hover:text-blue-700 hover:underline text-lg hover:font-bold '>Order</a>
          <a href="" className='hover:text-blue-700 hover:underline text-lg hover:font-bold '>Exchange</a>
        </div>

      </div>
      <div className="absolute  w-full flex justify-center 
      lg:bottom-8 md:bottom-5 bottom-5
      ">
        <span className=' text-center  border-t-1 
        xl:w-[82vw] lg:w-[88vw] sm:w-[90vw] w-[80vw] 
        lg:pt-7 md:pt-5 pt-5
        md:text-lg
        '>&copy; {new Date().getFullYear()} Hamro Bazzar. All rights reserved.</span>
      </div>

    </footer>
  )
}

export default Footer;
