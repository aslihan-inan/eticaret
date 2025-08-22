import logo1 from './assets/logo1.png';
import logo2 from './assets/logo2.png';
import logo3 from './assets/logo3.png';
import logo4 from './assets/logo4.png';
import logo5 from './assets/logo5.png';
import logo6 from './assets/logo6.png';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

export default function Logo() {
  return (
    <section className="w-full py-10 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6">
        {logos.map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`Logo ${i + 1}`}
            className="h-8 md:h-10 lg:h-12 object-contain"
          />
        ))}
      </div>
    </section>
  );
}
