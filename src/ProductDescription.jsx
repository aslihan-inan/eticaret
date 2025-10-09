import image from "./assets/001.jpg";
import DetailShop from './DetailShop';
import Logo from './Logo';

export default function ProductDescription() {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-20 py-10">
      {/* Üst buton grubu */}
      <div className="flex flex-wrap justify-center border-b mb-6 gap-2">
        <button className="px-4 py-2 font-medium hover:text-blue-600 transition">Description</button>
        <button className="px-4 py-2 font-medium hover:text-blue-600 transition">Additional Information</button>
        <button className="px-4 py-2 font-medium hover:text-blue-600 transition">Reviews (0)</button>
      </div>

      {/* Alt içerik grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px]">
          
          {/* Resim */}
          <div className="bg-gray-200 rounded-lg overflow-hidden w-full h-[300px] sm:h-[350px] md:h-[427px]">
            <img
              src={image}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Açıklama metinleri */}
          <div className="bg-white rounded-lg p-4 w-full h-auto md:h-[427px]">
            <h3 className="text-lg font-bold mb-2">The quick fox jumps over</h3>
            <p className="text-gray-700 mb-4 mt-2">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </p>
            <p className="text-gray-700 mb-4 mt-2">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </p>
            <p className="text-gray-700 mb-4 mt-2">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </p>
          </div>

          {/* Liste */}
          <div className="bg-white rounded-lg p-4 w-full h-auto md:h-[367px]">
            <h3 className="text-lg font-bold mb-2">The quick fox jumps over</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>The quick fox jumps over the lazy dog</li>
              <li>The quick fox jumps over the lazy dog</li>
              <li>The quick fox jumps over the lazy dog</li>
              <li>The quick fox jumps over the lazy dog</li>
            </ul>

            <h3 className="text-lg font-bold mb-2">The quick fox jumps over</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>The quick fox jumps over the lazy dog</li>
              <li>The quick fox jumps over the lazy dog</li>
              <li>The quick fox jumps over the lazy dog</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Diğer bileşenler */}
      <DetailShop />
      <Logo />
    </div>
  );
}
