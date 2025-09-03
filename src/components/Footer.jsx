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
  const footerLinks = [
    { names: "Information", path: "", anchorName1: "About Us", anchorName2: "Blog", anchorName3: "Testimonials" },
    { names: "Helpful Links", path: "", anchorName1: "Services", anchorName2: "Supports", anchorName3: "Terms & Condition" },
    { names: "Our Services", path: "", anchorName1: "Brand", anchorName2: "Order", anchorName3: "Exchange" },
  ]
  return (
    <footer className="relative h-[70vh] w-full text-blue-800 mt-10">
      <div className='absolute w-full h-20 bg-gradient-to-br from-white to-transparent'></div>
      <img src="/footer-background.png" alt="" className=' h-full w-full object-cover object-[center_10%]' />
      <img src="/hamro-bazzar-logo.png" alt="" className='absolute top-3
       lg:h-40 md:h-35
       xl:pl-20 lg:pl-4 
       ' />
      <div
        className="absolute top-37 z-20 flex gap-3 mt-10
    xl:pl-30 lg:pl-15 md:pl-9
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

      <div className='absolute top-16 w-full flex justify-end 
      xl:gap-19 lg:gap-10
      xl:pr-30 lg:pr-7

      '>
        <div className=' flex flex-col gap-4'>
          <h1 className='font-semibold text-2xl'>Contact Us</h1>
          <a href="" className='hover:text-blue-700 hover:underline '><Phone size={20} className='inline mr-4' /> 9808102206</a>
          <a href="" className='hover:text-blue-700 hover:underline '><Mail size={20} className='inline mr-4' /> hamrobazzar@gmail.com</a>
          <a href="" className='hover:text-blue-700 hover:underline '><FaWhatsapp size={20} className='inline mr-4' /> Whatsapp</a>
        </div>
        {footerLinks.map(({ names, path, anchorName1, anchorName2, anchorName3 }, idx) => {
          return (
            <div
              key={idx}
              className='  flex flex-col gap-4 '>
              <h1 className='text-2xl font-semibold'>{names}</h1>
              <a href={path} className='hover:text-blue-700 hover:underline hover:font-bold'>{anchorName1}</a>
              <a href={path} className='hover:text-blue-700 hover:underline hover:font-bold'>{anchorName2}</a>
              <a href={path} className='hover:text-blue-700 hover:underline hover:font-bold'>{anchorName3}</a>
            </div>
          )
        })}
      </div>
      <div className="absolute bottom-8 w-full flex justify-center ">
        <span className=' w-[82vw] text-center  border-t-1 pt-7'>&copy; {new Date().getFullYear()} Hamro Bazzar. All rights reserved.</span>
      </div>

    </footer>
  )
}

export default Footer;
