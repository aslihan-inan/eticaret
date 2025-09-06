// src/pages/CartTable.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  increaseCount,
  decreaseCount,
  toggleChecked,
  removeFromCart,
} from "../redux/slices/cartSlice";
import OrderSummary from "../components/OrderSummary"; // ✅ Sipariş Özeti bileşeni
import X from "../assets/work.jpg";

// Çöp kutusu ikonu için SVG
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

// Önceden eklenen ürünler
const previouslyAddedProducts = [
  {
    id: "3001",
    name: 'Lenovo IdeaPad 3 82H2020WYL | Intel Core i3-1115G4 | 8GB | 256GB SSD | 15.6" | DOS | Phd',
    price: 8499.0,
    image: X,
    store: "n11",
    shipping: "Kargo Ücretsiz",
    checked: true,
    count: 1,
  },
  {
    id: "3002",
    name: "2 Adet Cam Şeffaf Yağdanlık Ağız Yağlık Mdf Poliüretan 2'li",
    price: 186.95,
    image: X,
    store: "Decofilt",
    shipping: "Kargo Ücretsiz",
    checked: true,
    count: 1,
  },
  {
    id: "3003",
    name: "Triflo 3 Toplu Solunum Egzersiz Cihazı",
    price: 38.4,
    image: X,
    store: "Lovely",
    shipping: "Kargo Ücretsiz",
    checked: true,
    count: 1,
  },
];

// Önerilen ürünler
const recommendedProducts = [
  {
    id: "1001",
    name: "Bluetooth Kulaklık - Yüksek Kalite Ses",
    price: 299.99,
    image: X,
    store: "TechShop",
    shipping: "Ücretsiz Kargo",
    checked: false,
    count: 1,
  },
  {
    id: "1002",
    name: "Akıllı Saat - Spor ve Sağlık Takibi",
    price: 599.5,
    image: X,
    store: "WatchStore",
    shipping: "Ücretsiz Kargo",
    checked: false,
    count: 1,
  },
  {
    id: "1003",
    name: "Powerbank 10000mAh - Hızlı Şarj",
    price: 249.99,
    image: X,
    store: "GadgetWorld",
    shipping: "Ücretsiz Kargo",
    checked: false,
    count: 1,
  },
];

// Favori ürünler
const favoriteProducts = [
  {
    id: "2001",
    name: "Kahve Makinesi - Otomatik Espresso",
    price: 1299.0,
    image: X,
    store: "HomeAppliances",
    shipping: "Ücretsiz Kargo",
    checked: false,
    count: 1,
  },
  {
    id: "2002",
    name: "Kablosuz Mouse - Ergonomik Tasarım",
    price: 189.99,
    image: X,
    store: "TechAccessories",
    shipping: "Ücretsiz Kargo",
    checked: false,
    count: 1,
  },
  {
    id: "2003",
    name: "Kitap - JavaScript Programlama",
    price: 89.5,
    image: X,
    store: "BookStore",
    shipping: "Ücretsiz Kargo",
    checked: false,
    count: 1,
  },
];

export default function CartTable() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("previouslyAdded");
  const [externalProducts, setExternalProducts] = useState({
    previouslyAdded: previouslyAddedProducts,
    recommended: recommendedProducts,
    favorites: favoriteProducts,
  });

  const totalAmount = cart
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.count * item.product.price, 0);

  // Aktif tab içeriğini belirle
  const getActiveProducts = () => {
    return externalProducts[activeTab];
  };

  // Harici ürünlerdeki checkbox durumunu güncelle
  const handleExternalToggleChecked = (productId) => {
    setExternalProducts((prev) => {
      const updatedProducts = { ...prev };
      updatedProducts[activeTab] = updatedProducts[activeTab].map((product) =>
        product.id === productId
          ? { ...product, checked: !product.checked }
          : product
      );
      return updatedProducts;
    });
  };

  // Harici ürünlerin miktarını artır
  const handleExternalIncreaseCount = (productId) => {
    setExternalProducts((prev) => {
      const updatedProducts = { ...prev };
      updatedProducts[activeTab] = updatedProducts[activeTab].map((product) =>
        product.id === productId
          ? { ...product, count: product.count + 1 }
          : product
      );
      return updatedProducts;
    });
  };

  // Harici ürünlerin miktarını azalt
  const handleExternalDecreaseCount = (productId) => {
    setExternalProducts((prev) => {
      const updatedProducts = { ...prev };
      updatedProducts[activeTab] = updatedProducts[activeTab].map((product) =>
        product.id === productId && product.count > 1
          ? { ...product, count: product.count - 1 }
          : product
      );
      return updatedProducts;
    });
  };

  // Harici ürünleri sil
  const handleExternalRemove = (productId) => {
    setExternalProducts((prev) => {
      const updatedProducts = { ...prev };
      updatedProducts[activeTab] = updatedProducts[activeTab].filter(
        (product) => product.id !== productId
      );
      return updatedProducts;
    });
  };

  // Ürünü sepete ekle
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        store: product.store,
        shipping: product.shipping,
      })
    );
  };

  // Çöp kutusuna tıklandığında ürünü tamamen kaldır
  const handleTrashClick = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Alışveriş Sepeti</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol kısım: Sepet + Tablar */}
        <div className="lg:col-span-2 space-y-8">
          {/* Sepet Tablosu */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Sepetim</h2>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Ürün</th>
                  <th className="p-2 text-center">Fiyat</th>
                  <th className="p-2 text-center">Adet</th>
                  <th className="p-2 text-center">Toplam</th>
                  <th className="p-2 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.product.id} className="border-b">
                    <td className="p-2 flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() =>
                          dispatch(toggleChecked(item.product.id))
                        }
                        className="h-4 w-4 text-blue-600"
                      />
                      <img
                        src={item.product.image || X}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{item.product.name}</div>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                            onClick={() =>
                              dispatch(decreaseCount(item.product.id))
                            }
                          >
                            -
                          </button>
                          <span className="px-2 font-medium text-sm">
                            {item.count}
                          </span>
                          <button
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                            onClick={() =>
                              dispatch(increaseCount(item.product.id))
                            }
                          >
                            +
                          </button>
                          <button
                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center text-sm ml-2"
                            onClick={() => handleTrashClick(item.product.id)}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      {item.product.price} TL
                    </td>
                    <td className="p-2 text-center font-medium">
                      {item.count}
                    </td>
                    <td className="p-2 text-center font-medium">
                      {item.count * item.product.price} TL
                    </td>
                    <td className="p-2 text-center">
                      <button
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center mx-auto"
                        onClick={() => handleTrashClick(item.product.id)}
                      >
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right text-xl font-semibold mt-4 pt-4 border-t">
              Toplam: {totalAmount.toFixed(2)} TL
            </div>
          </div>

          {/* Tab Butonları */}
          <div className="flex mb-4 border-b">
            <button
              className={`py-3 px-6 font-medium text-lg ${
                activeTab === "previouslyAdded"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("previouslyAdded")}
            >
              Önceden Eklediklerim
            </button>
            <button
              className={`py-3 px-6 font-medium text-lg ${
                activeTab === "recommended"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("recommended")}
            >
              Önerilen Ürünler
            </button>
            <button
              className={`py-3 px-6 font-medium text-lg ${
                activeTab === "favorites"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              Favoriler
            </button>
          </div>

          {/* Ürün Listesi */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-4">
              {getActiveProducts().map((product) => (
                <div key={product.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <input
                        type="checkbox"
                        checked={product.checked}
                        onChange={() =>
                          handleExternalToggleChecked(product.id)
                        }
                        className="h-4 w-4 text-blue-600 mr-3"
                      />
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-semibold text-gray-700">
                            {product.store}
                          </span>
                          <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded">
                            {product.shipping}
                          </span>
                        </div>
                        <h3 className="text-md font-medium text-gray-800 line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Butonlar */}
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                            onClick={() =>
                              handleExternalDecreaseCount(product.id)
                            }
                          >
                            -
                          </button>
                          <span className="px-2 font-medium text-sm">
                            {product.count}
                          </span>
                          <button
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                            onClick={() =>
                              handleExternalIncreaseCount(product.id)
                            }
                          >
                            +
                          </button>
                          <button
                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center text-sm ml-2"
                            onClick={() => handleExternalRemove(product.id)}
                          >
                            <TrashIcon />
                          </button>
                          <button
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm ml-2"
                            onClick={() => handleAddToCart(product)}
                          >
                            Sepete Ekle
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col items-end">
                      <span className="text-lg font-bold text-gray-900">
                        {product.price.toFixed(2)} TL
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ kısım: Sipariş Özeti */}
        <OrderSummary totalAmount={totalAmount} />
      </div>
    </div>
  );
}
