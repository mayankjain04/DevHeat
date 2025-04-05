import React from "react";
import Spline from "@splinetool/react-spline";
import "./herosection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const navigate = useNavigate()
  return (
    <div className="bg-[#F7F7F7] py-36 px-20 flex">
      <div className="max-w-[50%] text-start mt-14 mb-10">
        <h1 className="text-6xl text-[#1F2833] main-text font-bold mb-7">
          Take Charge of Your
          <br />
          <span className="font-black text-[#18BED4]">Career Journey</span>
        </h1>
        <div>
          <p className="text-lx text-gray-600 leading-relaxed sub-text">
            Transform your ambitions into real opportunities. Discover your
            strengths, enhance your skills, and prepare for a rewarding career
            with our expert guidance.
          </p>
        </div>
        <div>
          <button className="group flex items-center gap-2 bg-[#18BED4] text-white px-8 py-4 rounded-lg 
              text-lg font-semibold hover:bg-[#15a8bc] transition-all transform hover:translate-x-1 shadow-lg"
              onClick={() => navigate("/signup")}>
            Get Started
            <FontAwesomeIcon className="group-hover:translate-x-1 transition-transform" icon={faArrowRight} style={{color: "#ffffff",}} />
          </button>
        </div>
      </div>
      <div className="max-w-[50%] overflow-hidden rounded-lg shadow-2xl transform">
        <Spline
          scene="https://prod.spline.design/g6BLyFde4VGmlScz/scene.splinecode" 
          width={680}
          height={450}
        />
      </div>
    </div>
  );
}

export default HeroSection;
