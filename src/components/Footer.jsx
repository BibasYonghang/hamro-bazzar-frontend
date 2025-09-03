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
    lg:h-[70vh] md:h-[80vh] h-[87vh] 
    ">
      <div className='absolute w-full h-20 bg-gradient-to-br from-white to-transparent'></div>
      <img src="/footer-background.png" alt="" className=' h-full w-full object-cover object-[center_10%]' />
      <img src="/hamro-bazzar-logo.png" alt="" className='absolute top-3
       lg:h-40 md:h-35 h-30
       xl:pl-20 lg:pl-4 
       ' />
      <div
        className="absolute z-20 flex gap-3 mt-10
        lg:top-37 md:top-56 top-98
        xl:pl-30 lg:pl-15 md:pl-9 pl-8
    ">
        {socialMediaIcons.map(({ path, className, icon: Icons }, idx) => (

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
      xl:gap-19 lg:gap-10 md:gap-12 gap-8
      xl:pr-30 lg:pr-7 
      lg:pl-0 md:pl-65 pl-8
      '>
        <div className=' flex flex-col 
        md:gap-4 gap-2
        '>
          <h1 className='font-semibold
          md:text-2xl text-lg 
          '>Contact Us</h1>
          <a href="" className='hover:text-blue-700 hover:underline md:text-base text-sm'><Phone size={window.innerWidth < 640 ? 15 : 20} className='inline md:mr-4 mr-1' /> 9808102206</a>
          <a href="" className='hover:text-blue-700 hover:underline md:text-base text-sm'><Mail size={window.innerWidth < 640 ? 15 : 20} className='inline md:mr-4 mr-1' /> hmrobzr@gmail.com</a>
          <a href="" className='hover:text-blue-700 hover:underline md:text-base text-sm'><FaWhatsapp size={window.innerWidth < 640 ? 15 : 20} className='inline md:mr-4 mr-1' /> Whatsapp</a>
        </div>

        <div
          className='flex flex-col 
           md:gap-4 gap-2
           '>
          <h1 className='font-semibold
          md:text-2xl text-lg
          '>Information</h1>
          <a href="" className=' hover:text-blue-700 hover:underline hover:font-bold
          md:text-base text-sm
          '>About Us</a>
          <a href="" className='hover:text-blue-700 hover:underline hover:font-bold
           md:text-base text-sm'>Blog</a>
          <a href="" className='hover:text-blue-700 hover:underline hover:font-bold 
          md:text-base text-sm'>Testimonials</a>
        </div>
        <div
          className='flex flex-col
           md:gap-4 gap-2
          '>
          <h1 className=' font-semibold
          md:text-2xl text-lg
          '>Helpful Links</h1>
          <a href="" className='hover:text-blue-700 hover:underline hover:font-bold md:text-base text-sm'>Service</a>
          <a href="" className='hover:text-blue-700 hover:underline hover:font-bold md:text-base text-sm'>Supports</a>
          <a href="" className='hover:text-blue-700 hover:underline hover:font-bold md:text-base text-sm'>Terms & Condition</a>
        </div>
        <div
          className='flex flex-col 
           md:gap-4 gap-2
          '>
          <h1 className='font-semibold
          md:text-2xl text-lg
          '>Our Services</h1>
          <a href="" className='hover:text-blue-700 hover:underline hover:font-bold md:text-base text-sm'>Brand</a>
          <a href="" className='hover:text-blue-700 hover:underline hover:font-bold md:text-base text-sm'>Order</a>
          <a href="" className='hover:text-blue-700 hover:underline hover:font-bold md:text-base text-sm'>Exchange</a>
        </div>

      </div>
      <div className="absolute  w-full flex justify-center 
      lg:bottom-8 md:bottom-5 bottom-5
      ">
        <span className=' text-center  border-t-1 
        xl:w-[82vw] lg:w-[88vw] sm:w-[90vw] w-[80vw] 
        lg:pt-7 md:pt-5 pt-5
        md:text-base text-sm
        '>&copy; {new Date().getFullYear()} Hamro Bazzar. All rights reserved.</span>
      </div>

    </footer>
  )
}

export default Footer;
