import React from "react";
import Logo from "../header/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
        <div className="bg-white border-t border-gray-200">
            <footer className="w-full py-7 px-20">
                <div className="flex justify-between">
                    <div className="mr-4">
                        <Logo />
                    </div>
                    <div className="copyright-text text-gray-400">
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
