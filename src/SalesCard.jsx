import React from 'react';
import image01 from "./assets/image01.png";

const colorConfig = {
  blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600', border: 'border-blue-600' },
  green: { bg: 'bg-green-600', hover: 'hover:bg-green-700', text: 'text-green-600', border: 'border-green-600' },
  purple: { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-600', border: 'border-purple-600' },
  red: { bg: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-600', border: 'border-red-600' },
};

const SalesCard = ({ buttonColor = 'blue', onColorSelect }) => {
  const { bg, hover, text, border } = colorConfig[buttonColor] || colorConfig.blue;

  return (
    <div className="flex w-[508px] h-[404px] overflow-hidden rounded-lg shadow-md">
      <div className="w-[209px] h-full flex-shrink-0">
        <img src={image01} alt="Product" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col flex-grow p-6 gap-3">
        <div>
          <h2 className="text-gray-500 text-sm font-medium">English Department</h2>
          <h1 className="text-xl font-bold text-gray-900 mt-1">Graphic Design</h1>
        </div>

        <p className="text-gray-600 text-sm flex-grow">
          We focus on ergonomics and meeting you where you work. It's only a keystroke away.
        </p>

        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span className="line-through text-gray-500">$16.48</span>
          <span className={`${text} font-bold`}>$6.48</span>
        </div>

        <div className="text-xs text-gray-500 mt-2">Color</div>
        <div className="flex space-x-2">
          {Object.keys(colorConfig).map((color) => (
            <button
              key={color}
              onClick={() => onColorSelect?.(color)}
              className={`
                w-5 h-5 rounded-full
                bg-${color}-600 hover:bg-${color}-700
                border-2
                ${buttonColor === color ? 'border-gray-900' : 'border-white'}
                transition
              `}
              aria-label={`Select ${color} color`}
              title={color}
              type="button"
            />
          ))}
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
 
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>22h...</span>
          </div>

          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span>64 Lessons</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Progress</span>
          </div>
        </div>

        <button
          type="button"
          className={`mt-auto ${bg} ${hover} text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300 flex items-center justify-center gap-1`}
        >
          Learn More
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SalesCard;
