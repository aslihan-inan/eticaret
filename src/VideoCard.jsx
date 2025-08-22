import React from "react";
import manzara from "./assets/manzara.jpg"; 

export default function VideoCard() {
  return (
 <section className="w-full flex justify-center relative mt-28">
  <div
    className="bg-white rounded-[20px] overflow-hidden relative"
    style={{ width: '989px', height: '540px', opacity: 1 }}
  >
    <img
      src={manzara} // assets içindeki resmi import et
      alt="Video placeholder"
      className="w-full h-full object-cover rounded-[20px]"
    />

    {/* Büyük daire */}
    <div
      className="absolute flex items-center justify-center bg-blue-500 rounded-full"
      style={{
        width: '92.6px',
        height: '92.6px',
        borderRadius: '73.6px',
        top: '224px',
        left: '448px',
        paddingTop: '34.8px',
        paddingRight: '36.8px',
        paddingBottom: '34.8px',
        paddingLeft: '36.8px',
      }}
    >

      <div
  className="absolute"
  style={{
    width: 0,
    height: 0,
    borderLeft: '19px solid white',  
    borderTop: '15px solid transparent', 
    borderBottom: '15px solid transparent',
    position: 'relative',
  }}
></div>


    </div>
  </div>
</section>

  );
}
