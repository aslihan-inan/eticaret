import img1 from "./assets/img1.svg";
import img2 from "./assets/img2.svg";
import img3 from "./assets/img3.svg";

export default function FeaturedSection() {
  const features = [
    {
      id: 1,
      icon: img1,
      title: "Easy Wins",
      description: "Get your best looking smile now!",
    },
    {
      id: 2,
      icon: img2,
      title: "Concrete",
      description:
        "Defalcate is most focused in helping you discover your most beautiful smile",
    },
    {
      id: 3,
      icon: img3,
      title: "Hack Growth",
      description: "Overcame any hurdle or any other problem.",
    },
  ];

  return (
    <section className="pt-16 sm:pt-20 pb-16 sm:pb-20 px-4 sm:px-6 flex justify-center bg-white">
      <div className="max-w-[1050px] w-full flex flex-col items-center gap-12 sm:gap-16">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Products</h2>
          <h3 className="text-lg sm:text-xl text-gray-700 mb-3 sm:mb-4">THE BEST SERVICES</h3>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 w-full">
          {features.map((item) => (
            <div
              key={item.id}
              className="w-full sm:w-[280px] md:w-[315px] h-auto px-6 sm:px-10 py-8 flex flex-col items-center text-center gap-4 sm:gap-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img src={item.icon} alt={item.title} className="w-12 sm:w-16 h-12 sm:h-16" />
              <h4 className="text-base sm:text-lg font-semibold">{item.title}</h4>
              <p className="text-gray-500 text-xs sm:text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
