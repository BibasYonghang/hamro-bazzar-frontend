// Footer.jsx
import { Mail, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import React from 'react';

const Footer = () => (
  <footer className="relative h-[70vh] w-full text-blue-800 mt-10">
    <div className='absolute w-full h-20 bg-gradient-to-br from-white to-transparent'></div>
    <img src="/footer-background.png" alt="" className=' h-full w-full object-cover object-[center_10%]' />
    <img src="/hamro-bazzar-logo.png" alt="" className='h-40 absolute top-3 pl-20' />

    <div className="absolute top-37 z-20 flex gap-3 mt-10
    lg:px-30">
      <a href=""><FaFacebook size={30} className='bg-blue-600 rounded-full  text-white p-1' /></a>
      <a href=""><FaInstagram size={30} className='bg-blue-600 rounded-full  text-white p-1' /></a>
      <a href=""><FaLinkedin size={30} className='bg-blue-600 rounded-full  text-white p-1' /></a>
      <a href=""><FaTwitter size={30} className='bg-blue-600 rounded-full  text-white p-1' /></a>
    </div>
    <div className='absolute top-16 w-full flex justify-end gap-19 pr-30'>
      <div className=' flex flex-col gap-3'>
        <h1 className='font-semibold text-2xl'>Contact Us</h1>
        <a href="" className='text-lg'><Phone size={20} className='inline mr-4' /> 9808102206</a>
        <a href="" className='text-lg'><Mail size={20} className='inline mr-4' /> hamrobazzar@gmail.com</a>
        <a href="" className='text-lg'><FaWhatsapp size={20} className='inline mr-4' /> Whatsapp</a>
      </div>
      <div className='  flex flex-col gap-4'>
        <h1 className='text-2xl font-semibold'>Information</h1>
        <a href="">About Us</a>
        <a href="">Blog</a>
        <a href="">Testimonials</a>
        <a href="">Events</a>
      </div>
      <div className='  flex flex-col gap-4'>
        <h1 className='text-2xl font-semibold'>Helpful Links</h1>
        <a href="">Service</a>
        <a href="">Supports</a>
        <a href="">Terms & Condition</a>
        <a href="">Privacy Policy</a>
      </div>
      <div className='  flex flex-col gap-4'>
        <h1 className='text-2xl font-semibold'>Our Services</h1>
        <a href="">Brand List</a>
        <a href="">Order</a>
        <a href="">Return & Exchange</a>
        <a href="">Fashion List</a>
      </div>
    </div>
    <div className="absolute bottom-8 w-full flex justify-center ">

      <span className=' w-[82vw] text-center  border-t-1 pt-7'>&copy; {new Date().getFullYear()} Hamro Bazzar. All rights reserved.</span>
    </div>

  </footer>
);

export default Footer;
