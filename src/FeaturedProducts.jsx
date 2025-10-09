import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';

export default function FeaturedSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 xl:px-20 py-8 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
        <img
          src={img1}
          alt="Product 1"
          className="w-full sm:w-[280px] h-[300px] sm:h-[400px] md:h-[498px] object-cover rounded-md"
        />
        <img
          src={img2}
          alt="Product 2"
          className="w-full sm:w-[280px] h-[300px] sm:h-[400px] md:h-[498px] object-cover rounded-md"
        />
      </div>

      <div className="flex flex-col gap-4 max-w-xl text-center lg:text-left">
        <h5 className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
          Featured Products
        </h5>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
          We love what we do
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
        </p>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
        </p>
      </div>
    </section>
  );
}
