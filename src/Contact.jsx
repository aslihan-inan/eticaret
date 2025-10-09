import React from "react";
import back from "./assets/back.jpg";

export default function Contact() {
  return (
    <div>
      <section
        id="feature-section"
        className="relative w-full h-[400px] sm:h-[446px] md:h-[500px] bg-center bg-cover flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-20"
        style={{ backgroundImage: `url(${back})` }}
      >
        {/* Başlık */}
        <h2 className="text-center font-montserrat font-bold text-[24px] sm:text-[28px] md:text-[36px] lg:text-[40px] leading-[28px] sm:leading-[32px] md:leading-[45px] lg:leading-[50px] tracking-[0.2px] mb-4">
          Questions & Answers
        </h2>

        {/* Alt paragraf */}
        <p className="text-center font-montserrat font-medium text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-[16px] sm:leading-[18px] md:leading-[20px] lg:leading-[24px] tracking-[0.2px] mb-6 max-w-[280px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px]">
          Problems trying to resolve the conflict between the two <br className="hidden md:block"/> major realms of Classical physics:
        </p>

        {/* Contact Us */}
        <h2
          className="text-center font-montserrat font-bold text-[12px] sm:text-[14px] md:text-[16px] leading-[20px] sm:leading-[24px] tracking-[0.2px] cursor-pointer"
          style={{ color: "#23A6F0" }}
        >
          Contact Us
        </h2>
      </section>
    </div>
  );
}
