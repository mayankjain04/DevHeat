import React from "react";
import Logo from "../header/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="bg-white border-t border-gray-200">
      <footer className="w-full py-7 px-6 md:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="mr-0 md:mr-4">
            <Logo />
          </div>
          <div className="copyright-text text-gray-400 text-center md:text-left">
            © 2025 CareerQuest. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 text-2xl hover:text-[#18BED4] transition-colors">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="text-gray-600 text-2xl hover:text-[#18BED4] transition-colors">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="#" className="text-gray-600 text-2xl hover:text-[#18BED4] transition-colors">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
