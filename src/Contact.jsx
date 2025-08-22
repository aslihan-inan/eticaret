import React from "react";
import back from "./assets/back.jpg";

export default function Contact() {
  return (
    <div>
      <section
        id="feature-section"
        className="relative w-full h-[446px] bg-center bg-cover flex flex-col items-center justify-center px-4 sm:px-6 md:px-0"
        style={{ backgroundImage: `url(${back})` }}
      >
        {/* Başlık */}
        <h2 className="text-center font-montserrat font-bold text-[28px] sm:text-[36px] md:text-[40px] leading-[35px] sm:leading-[45px] md:leading-[50px] tracking-[0.2px] mb-4">
          Questions & Answers
        </h2>

        {/* Alt paragraf */}
        <p className="text-center font-montserrat font-medium text-[12px] sm:text-[14px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.2px] mb-6 max-w-[320px] sm:max-w-[600px] md:max-w-[800px]">
          Problems trying to resolve the conflict between the two <br></br>major realms of Classical physics:
        </p>

        {/* Contact Us */}
        <h2
          className="text-center font-montserrat font-bold text-[12px] sm:text-[14px] leading-[20px] sm:leading-[24px] tracking-[0.2px]  cursor-pointer"
          style={{ color: "#23A6F0" }}
        >
          Contact Us
        </h2>
      </section>
    </div>
  );
}
