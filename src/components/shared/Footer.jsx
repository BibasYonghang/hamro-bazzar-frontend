// Footer.jsx
import { Mail, Phone } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import React from "react";

const Footer = () => {
  const socialMediaIconsClass =
    "bg-blue-600 rounded-full  text-white p-1 h-8 w-8";
  const socialMediaIcons = [
    { path: "", icon: FaFacebook },
    { path: "", icon: FaInstagram },
    { path: "", icon: FaLinkedin },
    { path: "", icon: FaYoutube },
  ];
  return (
    <footer className="relative h-[98vh] w-full text-blue-800 md:h-[80vh] lg:h-[70vh]">
      <div className="absolute h-20 w-full bg-gradient-to-br from-white to-transparent"></div>
      <img
        src="/images/footer-background.png"
        alt=""
        className="h-full w-full object-cover object-[center_10%]"
      />
      <img
        src="/images/hamro-bazzar-logo.png"
        alt=""
        className="absolute top-3 h-30 md:h-35 lg:h-40"
      />
      <div className="absolute top-114 z-20 mt-10 flex gap-3 pl-9 sm:top-107 md:top-56 lg:top-37">
        {socialMediaIcons.map(({ path, icon: Icons }, idx) => (
          <a key={idx} href={path}>
            <Icons className={socialMediaIconsClass} />
          </a>
        ))}
      </div>
      <div className="absolute top-30 grid w-full grid-cols-2 gap-8 pl-8 md:top-14 md:gap-12 md:pl-65 lg:top-16 lg:flex lg:justify-end lg:gap-14 lg:pr-7 lg:pl-0 xl:gap-32 xl:pr-10">
        <div className="flex flex-col gap-2 sm:gap-4">
          <h1 className="text-xl font-bold sm:text-2xl">Contact Us</h1>
          <a
            href=""
            className="text-lg hover:font-bold hover:text-blue-700 hover:underline"
          >
            <Phone
              size={window.innerWidth < 640 ? 15 : 20}
              className="mr-1 inline md:mr-4"
            />{" "}
            9808102206
          </a>
          <a href="" className="ld text-lg hover:text-blue-700 hover:underline">
            <Mail
              size={window.innerWidth < 640 ? 15 : 20}
              className="mr-1 inline md:mr-4"
            />{" "}
            hmrobzr@gmail.com
          </a>
          <a
            href=""
            className="text-lg hover:font-bold hover:text-blue-700 hover:underline"
          >
            <FaWhatsapp
              size={window.innerWidth < 640 ? 15 : 20}
              className="mr-1 inline md:mr-4"
            />{" "}
            Whatsapp
          </a>
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <h1 className="text-xl font-bold sm:text-2xl">Information</h1>
          <a
            href=""
            className="text-lg hover:font-bold hover:text-blue-700 hover:underline"
          >
            About Us
          </a>
          <a
            href="/blog"
            className="text-lg hover:font-bold hover:text-blue-700 hover:underline"
          >
            Blog
          </a>
          <a
            href=""
            className="text-lg hover:font-bold hover:text-blue-700 hover:underline"
          >
            Testimonials
          </a>
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:mt-0 md:gap-4">
          <h1 className="text-xl font-bold sm:text-2xl">Helpful Links</h1>
          <a
            href=""
            className="text-lg hover:font-bold hover:text-blue-700 hover:underline"
          >
            Service
          </a>
          <a
            href=""
            className="text-lg hover:font-bold hover:text-blue-700 hover:underline"
          >
            Supports
          </a>
          <a
            href=""
            className="text-lg hover:font-bold hover:text-blue-700 hover:underline"
          >
            Terms & Condition
          </a>
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:mt-0 md:gap-4">
          <h1 className="text-xl font-bold sm:text-2xl">Our Services</h1>
          <a
            href=""
            className="text-lg hover:font-bold hover:text-blue-700 hover:underline"
          >
            Brand
          </a>
          <a
            href=""
            className="text-lg hover:font-bold hover:text-blue-700 hover:underline"
          >
            Order
          </a>
          <a
            href=""
            className="text-lg hover:font-bold hover:text-blue-700 hover:underline"
          >
            Exchange
          </a>
        </div>
      </div>
      <div className="absolute bottom-5 flex w-full justify-center md:bottom-5 lg:bottom-8">
        <span className="w-[80vw] border-t-1 pt-5 text-center sm:w-[90vw] md:pt-5 md:text-lg lg:w-[88vw] lg:pt-7 xl:w-[82vw]">
          &copy; {new Date().getFullYear()} Hamro Bazzar. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
