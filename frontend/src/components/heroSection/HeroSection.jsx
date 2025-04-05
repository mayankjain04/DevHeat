import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import "./herosection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();
  const [isSplineLoading, setIsSplineLoading] = useState(true);

  return (
    <div className="bg-[#F7F7F7] flex flex-col-reverse lg:flex-row items-center justify-between 
                    px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20 md:py-28 lg:py-36 gap-10">

      {/* Text Section */}
      <div className="w-full lg:w-1/2 text-center sm:text-start mt-10 lg:mt-14 mb-10">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl text-[#1F2833] main-text font-bold mb-7 leading-tight">
          Take Charge of Your
          <br />
          <span className="font-black text-[#18BED4]">Career Journey</span>
        </h1>
        <div>
          <p className="text-md sm:text-lg text-gray-600 leading-relaxed sub-text">
            Transform your ambitions into real opportunities. Discover your strengths, enhance your skills, and prepare for a rewarding career with our expert guidance.
          </p>
        </div>
        <div className="mt-6">
          <button
            className="group w-full sm:w-48 flex justify-center items-center gap-2 bg-[#18BED4] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md sm:rounded-lg 
              text-base sm:text-lg font-semibold hover:bg-[#15a8bc] transition-all transform hover:translate-x-1 shadow-lg"
            onClick={() => navigate("/signup")}
          >
            Get Started
            <FontAwesomeIcon
              className="group-hover:translate-x-1 transition-transform"
              icon={faArrowRight}
              style={{ color: "#ffffff" }}
            />
          </button>
        </div>
      </div>

      {/* Spline Section with Loader */}
      <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[400px] md:min-h-[450px] rounded-lg shadow-2xl overflow-hidden">
        {isSplineLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#18BED4] border-solid"></div>
          </div>
        )}
        <Spline
          scene="https://prod.spline.design/g6BLyFde4VGmlScz/scene.splinecode"
          onLoad={() => setIsSplineLoading(false)}
        />
      </div>
    </div>
  );
}

export default HeroSection;
