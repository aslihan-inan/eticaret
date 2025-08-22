import image from "./assets/001.jpg";
import DetailShop from './DetailShop';
import Logo from './Logo';



export default function ProductDescription() { 
  return (
    <div>
      {/* Üst buton grubu */}
      <div className="flex border-b mb-6 flex justify-center mt-10">
        <button className="px-4 py-2 font-medium">Description</button>
        <button className="px-4 py-2 font-medium">Additional Information</button>
        <button className="px-4 py-2 font-medium">Reviews (0)</button>
      </div>

      {/* Alt içerik grid */}
      <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[1056px] h-[499px] flex justify-center">
        
        {/* Resim */}
        <div className="bg-gray-200 rounded-lg overflow-hidden mt-7 w-[332px] h-[427px]">
          <img
            src={image}
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Açıklama metinleri */}
        <div className="bg-white rounded-lg p-4 w-[332px] h-[427px]">
          <h3 className="text-lg font-bold mb-2">the quick fox jumps over</h3>
          <p className="text-gray-700 mb-6 mt-5">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
          </p>
          <p className="text-gray-700 mb-6 mt-5">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
          </p>
          <p className="text-gray-700 mb-6 mt-5">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
          </p>
        </div>

        {/* Liste */}
        <div className="bg-white rounded-lg p-4 w-[332px] h-[367px]">
          <h3 className="text-lg font-bold mb-2">the quick fox jumps over</h3>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>the quick fox jumps over the lazy dog</li>
            <li>the quick fox jumps over the lazy dog</li>
            <li>the quick fox jumps over the lazy dog</li>
            <li>the quick fox jumps over the lazy dog</li>
          </ul>

          <h3 className="text-lg font-bold mb-2">the quick fox jumps over</h3>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>the quick fox jumps over the lazy dog</li>
            <li>the quick fox jumps over the lazy dog</li>
            <li>the quick fox jumps over the lazy dog</li>
          </ul>
        </div>
      </div>
    </div>
    < DetailShop />
    < Logo />
    </div>
  );
}
