import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">
                RoomRental and home solution
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for finding the perfect rental property. We
              connect renters with quality homes across India.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  to="/properties"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Properties
                </a>
              </li>
              <li>
                <a
                  to="/services"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  to="/add-property"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  List Property
                </a>
              </li>
              <li>
                <a
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <a
                  to="/bungalows"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Bungalows for Rent
                </a>
              </li>
              <li>
                <a
                  to="/flats"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Flats for Rent
                </a>
              </li>
              <li>
                <a
                  to="/tenements"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Tenements for Rent
                </a>
              </li>
              <li>
                <a
                  to="/furnished"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Furnished Properties
                </a>
              </li>
              <li>
                <a
                  to="/commercial"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Commercial Spaces
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+91 7667816204</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@renthome.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  43,nand dham ,parivar
                  <br />
                  vadpdara, India 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 RoomRental and home solution. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
