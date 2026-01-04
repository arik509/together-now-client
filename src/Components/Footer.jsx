import React from "react";
import logo from "../assets/Together Now.png";
import { Inbox, MapPin, PhoneIcon } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => (
  <div className="bg-base-300 transition-colors duration-500 mt-auto">
    <footer className="pt-12 pb-4 w-11/12 mx-auto">
      <div className="max-w-8xl mx-auto px-6">
        <div className="mb-8 md:mb-6 shrink-0 flex flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            <img className="w-[50px]" src={logo} alt="Together Now Logo" />
            <span className="text-2xl font-bold text-primary">
              Together Now
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 w-full">
            <div className="text-primary">
              <h3 className="font-bold mb-2">About</h3>
              <ul className="space-y-1 text-[12px] md:text-[16px] text-accent">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-green-600 transition-colors"
                  >
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-green-600 transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-green-600 transition-colors"
                  >
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-primary">
              <h3 className="font-bold mb-2">Service</h3>
              <ul className="space-y-1 text-[12px] md:text-[16px] text-accent">
                <li>
                  <Link
                    to="/upcoming-events"
                    className="hover:text-green-600 transition-colors"
                  >
                    Nature
                  </Link>
                </li>
                <li>
                  <Link
                    to="/upcoming-events"
                    className="hover:text-green-600 transition-colors"
                  >
                    Donation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/upcoming-events"
                    className="hover:text-green-600 transition-colors"
                  >
                    Action
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-primary">
              <h3 className="font-bold mb-2">Policies</h3>
              <ul className="space-y-1 text-[12px] md:text-[16px] text-accent">
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-green-600 transition-colors cursor-pointer"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-green-600 transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-green-600 transition-colors cursor-pointer"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-primary">
              <h3 className="font-bold mb-2">Contact Info</h3>
              <ul className="space-y-2 text-[12px] md:text-[16px] text-accent">
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="shrink-0" />
                  <span>Dhaka, Bangladesh</span>
                </li>
                <li className="flex items-center gap-2">
                  <Inbox size={16} className="shrink-0" />
                  <a href="" className="hover:text-green-600 transition-colors">
                    to.now@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneIcon size={16} className="shrink-0" />
                  <a href="" className="hover:text-green-600 transition-colors">
                    +880 1511 515 555
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:justify-between items-center border-t border-accent pt-4">
          <span className="text-accent text-sm">
            ©2026 Together Now. All rights reserved.
          </span>
          <div className="flex gap-4 mt-4 md:mt-0 text-accent">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition-colors hover:scale-110 transform duration-200"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition-colors hover:scale-110 transform duration-200"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition-colors hover:scale-110 transform duration-200"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition-colors hover:scale-110 transform duration-200"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
