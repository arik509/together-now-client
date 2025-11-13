import React from "react";


import logo from "../assets/Together Now.png"
import { Facebook, FacebookIcon, Inbox, LucideFacebook, MapPin, PhoneIcon, X, XCircleIcon, XIcon } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => (
  <div className="bg-base-300 transition-colors duration-500">
    <footer className="pt-12 pb-4 w-11/12 mx-auto">
      <div className="max-w-8xl mx-auto px-6">
      <div className="mb-8 md:mb-6 shrink-0 flex flex-col items-start gap-3">
            <div className="flex items-center gap-2">
              <img className="w-[50px]" src={logo} alt="" />
              <span className="text-2xl font-bold text-green-700 dark:text-green-300">
                Together Now
              </span>
            </div>
          </div>
        <div className="flex flex-col md:flex-row md:justify-between">
          

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 w-full">
            <div className="text-green-700 dark:text-green-300">
              <h3 className="font-bold mb-2">About</h3>
              <ul className="space-y-1 text-green-900 dark:text-green-200">
                <li>Who We Are</li>
                <li>Our Story</li>
                <li>Gallery</li>
              </ul>
            </div>
            <div className="text-green-700 dark:text-green-300">
              <h3 className="font-bold mb-2">Service</h3>
              <ul className="space-y-1 text-green-900 dark:text-green-200">
                <li>Nature</li>
                <li>Donation</li>
                <li>Action</li>
              </ul>
            </div>
            <div className="text-green-700 dark:text-green-300">
              <h3 className="font-bold mb-2">Policies</h3>
              <ul className="space-y-1 text-green-900 dark:text-green-200">
                <li>Terms & Conditions</li>
                <li>Service</li>
                <li>Destination</li>
              </ul>
            </div>
            <div className="text-green-700 dark:text-green-300">
              <h3 className="font-bold mb-2">Contact Info</h3>
              <ul className="space-y-1 text-[14px] md:text-[16px] text-green-900 dark:text-green-200">
                <li className="flex items-center gap-2">
                  <MapPin size={16}></MapPin> Dhaka, Bangladesh
                </li>
                <li className="flex items-center gap-2">
                   <Inbox size={16}></Inbox> togethernow@gmail.com
                </li>
                <li className="flex items-center gap-2">
                   <PhoneIcon size={16}></PhoneIcon> 5511515-5555
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col md:flex-row md:justify-between items-center border-t border-green-700 dark:border-green-400 pt-4">
          <span className="text-green-700 dark:text-green-300 text-sm">
            ©2025 Together Now. All rights reserved.
          </span>
          <div className="flex gap-4 mt-4 md:mt-0">
           <FaFacebook></FaFacebook>
           <FaXTwitter></FaXTwitter>
           <FaInstagram></FaInstagram>
           <FaYoutube></FaYoutube>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
