import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import api from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    address: "",
  });

  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [newCard, setNewCard] = useState({
    card_no: "",
    expire_month: "",
    expire_year: "",
    name_on_card: "",
    ccv: "",
  });
  const [showCardForm, setShowCardForm] = useState(false);
  const [isEditingCard, setIsEditingCard] = useState(false);

  // ---------------- VERİ ÇEKME ----------------
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [cardsRes, addrRes] = await Promise.all([
          api.get("/user/card"),
          api.get("/user/address"),
        ]);
        setCards(cardsRes.data || []);
        setAddresses(addrRes.data || []);
      } catch (err) {
        console.error("Veri çekerken hata:", err.response?.data || err.message);
        toast.error("Veriler çekilemedi!");
      }
    };
    fetchAll();
  }, []);

  // ---------------- ADRES İŞLEMLERİ ----------------
  const handleAddressChange = (e) =>
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });

  const handleSaveAddress = async () => {
    const { title, name, surname, phone, city } = newAddress;
    if (!title || !name || !surname || !phone || !city)
      return toast.error("Tüm zorunlu alanları doldurun!");
    try {
      const res = await api.post("/user/address", newAddress);
      setAddresses((prev) => [...prev, res.data]);
      setNewAddress({
        title: "",
        name: "",
        surname: "",
        phone: "",
        city: "",
        district: "",
        neighborhood: "",
        address: "",
      });
      setShowAddressForm(false);
      toast.success("Adres kaydedildi ✅");
    } catch (err) {
      console.error(err);
      toast.error("Adres kaydedilemedi!");
    }
  };

  // ---------------- KART İŞLEMLERİ ----------------
  const handleCardChange = (e) =>
    setNewCard({ ...newCard, [e.target.name]: e.target.value });

  const resetCardForm = () => {
    setNewCard({
      card_no: "",
      expire_month: "",
      expire_year: "",
      name_on_card: "",
      ccv: "",
    });
    setShowCardForm(false);
    setIsEditingCard(false);
    setSelectedCardId(null);
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/card", {
        ...newCard,
        expire_month: Number(newCard.expire_month),
        expire_year: Number(newCard.expire_year),
      });
      setCards((prev) => [...prev, res.data]);
      resetCardForm();
      toast.success("Kart kaydedildi ✅");
    } catch (err) {
      console.error(err);
      toast.error("Kart eklenirken hata!");
    }
  };

  const handleUpdateCard = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/user/card/${selectedCardId}`, {
        ...newCard,
        expire_month: Number(newCard.expire_month),
        expire_year: Number(newCard.expire_year),
      });
      const res = await api.get("/user/card");
      setCards(res.data || []);
      resetCardForm();
      toast.success("Kart güncellendi ✅");
    } catch (err) {
      console.error(err);
      toast.error("Kart güncellenemedi!");
    }
  };

  const handleDeleteCard = async (id) => {
    if (!window.confirm("Kartı silmek istediğinize emin misiniz?")) return;
    try {
      await api.delete(`/user/card/${id}`);
      setCards((prev) => prev.filter((c) => c.id !== id && c._id !== id));
      toast.success("Kart silindi ✅");
    } catch (err) {
      console.error(err);
      toast.error("Kart silinirken hata!");
    }
  };

  const startEditingCard = (card) => {
    setNewCard({ ...card });
    setSelectedCardId(card.id || card._id);
    setIsEditingCard(true);
    setShowCardForm(true);
  };

  // ---------------- HESAPLAMA ----------------
  const productTotal = cartItems.reduce(
    (acc, item) => acc + (item.product.price || 0) * item.count,
    0
  );
  const shipping = productTotal >= 150 ? 0 : 29.99;
  const total = productTotal + shipping;

  // ---------------- ÖDEME ----------------
  const handleCheckout = async () => {
    if (!selectedAddressId) return toast.error("Lütfen bir adres seçin!");
    if (!selectedCardId) return toast.error("Lütfen bir kart seçin!");
    if (cartItems.length === 0) return toast.error("Sepetiniz boş!");

    const selectedCard = cards.find((c) => c.id === selectedCardId || c._id === selectedCardId);

    const payload = {
      address_id: selectedAddressId,
      order_date: new Date().toISOString(),
      card_no: selectedCard.card_no,
      card_name: selectedCard.name_on_card,
      card_expire_month: selectedCard.expire_month,
      card_expire_year: selectedCard.expire_year,
      card_ccv: selectedCard.ccv,
      price: total,
      products: cartItems.map((i) => ({
        product_id: i.product.id,
        count: i.count,
        detail: i.product.detail || "",
      })),
    };

    try {
      await api.post("/order", payload);
      toast.success("Siparişiniz alındı! 🎉");
      cartItems.forEach((i) => dispatch(removeFromCart(i.product.id)));
    } catch (err) {
      console.error("Sipariş oluşturma hatası:", err.response?.data || err.message);
      toast.error("Sipariş oluşturulamadı!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Toaster position="top-right" />

      {/* Sol Alan */}
      <div className="lg:col-span-2 space-y-6">
        {/* Adresler */}
        <div className="border rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">1. Adres Bilgileri</h2>

          <button
            onClick={() => setShowAddressForm(true)}
            className="flex items-center justify-center border-2 border-dashed rounded-xl p-6 text-gray-500 hover:bg-gray-50 w-full"
          >
            <Plus className="mr-2" /> Yeni Adres Ekle
          </button>

          {/* Adres Listesi */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {addresses?.length > 0 ? (
              addresses.map((addr) => (
                <div
                  key={addr.id || addr._id}
                  onClick={() => setSelectedAddressId(addr.id || addr._id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    selectedAddressId === (addr.id || addr._id)
                      ? "border-orange-500 bg-orange-50 shadow"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <h4 className="font-semibold">{addr?.title || "Adres Başlığı"}</h4>
                  <p className="text-sm">
                    {addr?.name} {addr?.surname}
                  </p>
                  <p className="text-sm text-gray-600">{addr?.phone}</p>
                  <p className="text-sm text-gray-600">
                    {addr?.city} / {addr?.district}
                  </p>
                  <p className="text-sm text-gray-600">{addr?.neighborhood}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Henüz kayıtlı adres yok.</p>
            )}
          </div>

          {/* Yeni Adres Formu */}
          {showAddressForm && (
            <div className="mt-6 border-t pt-4 space-y-3">
              <input
                name="title"
                placeholder="Adres Başlığı"
                value={newAddress.title}
                onChange={handleAddressChange}
                className="w-full border rounded p-2 text-sm"
              />
              <input
                name="name"
                placeholder="Ad"
                value={newAddress.name}
                onChange={handleAddressChange}
                className="w-full border rounded p-2 text-sm"
              />
              <input
                name="surname"
                placeholder="Soyad"
                value={newAddress.surname}
                onChange={handleAddressChange}
                className="w-full border rounded p-2 text-sm"
              />
              <input
                name="phone"
                placeholder="Telefon"
                value={newAddress.phone}
                onChange={handleAddressChange}
                className="w-full border rounded p-2 text-sm"
              />
              <select
                name="city"
                value={newAddress.city}
                onChange={handleAddressChange}
                className="w-full border rounded p-2 text-sm"
              >
                <option value="">Şehir Seç</option>
                <option value="İstanbul">İstanbul</option>
                <option value="Ankara">Ankara</option>
                <option value="İzmir">İzmir</option>
              </select>
              <input
                name="district"
                placeholder="İlçe"
                value={newAddress.district}
                onChange={handleAddressChange}
                className="w-full border rounded p-2 text-sm"
              />
              <input
                name="neighborhood"
                placeholder="Mahalle"
                value={newAddress.neighborhood}
                onChange={handleAddressChange}
                className="w-full border rounded p-2 text-sm"
              />
              <textarea
                name="address"
                placeholder="Adres Detayı"
                value={newAddress.address}
                onChange={handleAddressChange}
                className="w-full border rounded p-2 text-sm"
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleSaveAddress}
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                >
                  İptal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Kartlar */}
        <div className="border rounded-2xl p-4 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">2. Ödeme Seçenekleri</h2>

          {/* Kart Listesi */}
          <div className="space-y-2">
            {cards?.length > 0 ? (
              cards.map((card) => (
                <div
                  key={card.id || card._id}
                  onClick={() => setSelectedCardId(card.id || card._id)}
                  className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition-all duration-200 ${
                    selectedCardId === (card.id || card._id)
                      ? "border-orange-500 bg-orange-50 shadow"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{card?.name_on_card || "Kart Sahibi"}</p>
                    <p className="text-xs text-gray-500">
                      **** **** **** {card?.card_no?.slice(-4) || "XXXX"} | {card?.expire_month || "MM"}/{card?.expire_year || "YY"}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditingCard(card);
                      }}
                      className="text-blue-500 text-xs hover:underline"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCard(card.id || card._id);
                      }}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Henüz kayıtlı kart yok.</p>
            )}
          </div>

          {/* Yeni Kart Ekle */}
          {!showCardForm && (
            <button
              onClick={() => setShowCardForm(true)}
              className="text-sm text-blue-600 hover:underline mt-2"
            >
              + Yeni Kart Ekle
            </button>
          )}

          {/* Kart Formu */}
          {showCardForm && (
            <form
              onSubmit={isEditingCard ? handleUpdateCard : handleAddCard}
              className="space-y-3 mt-2"
            >
              <input
                name="card_no"
                type="text"
                placeholder="Kart Numarası"
                value={newCard.card_no}
                onChange={handleCardChange}
                className="w-full border p-2 rounded-lg"
                required
              />
              <div className="flex space-x-2">
                <input
                  name="expire_month"
                  type="number"
                  placeholder="Ay"
                  value={newCard.expire_month}
                  onChange={handleCardChange}
                  className="w-1/2 border p-2 rounded-lg"
                  required
                />
                <input
                  name="expire_year"
                  type="number"
                  placeholder="Yıl"
                  value={newCard.expire_year}
                  onChange={handleCardChange}
                  className="w-1/2 border p-2 rounded-lg"
                  required
                />
              </div>
              <input
                name="name_on_card"
                type="text"
                placeholder="Kart Üzerindeki İsim"
                value={newCard.name_on_card}
                onChange={handleCardChange}
                className="w-full border p-2 rounded-lg"
                required
              />
              <input
                name="ccv"
                type="number"
                placeholder="CCV"
                value={newCard.ccv}
                onChange={handleCardChange}
                className="w-full border p-2 rounded-lg"
                required
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <button type="submit" className="flex-1 bg-orange-500 text-white py-2 rounded-lg">
                  {isEditingCard ? "Güncelle" : "Kaydet"}
                </button>
                <button
                  type="button"
                  onClick={resetCardForm}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                >
                  İptal
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Sağ Alan: Sipariş Özeti */}
      <div className="border rounded-2xl p-4 shadow-sm h-fit">
        <h2 className="text-lg font-semibold mb-4">Sipariş Özeti</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Ürünün Toplamı</span>
            <span>{productTotal.toFixed(2)} TL</span>
          </div>
          <div className="flex justify-between">
            <span>Kargo Toplam</span>
            <span>{shipping.toFixed(2)} TL</span>
          </div>
          {shipping === 0 && (
            <div className="flex justify-between text-green-600">
              <span>150 TL ve Üzeri Kargo Bedava</span>
              <span>-29,99 TL</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Toplam</span>
            <span>{total.toFixed(2)} TL</span>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-4 w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600"
        >
          Ödeme Yap
        </button>
      </div>
    </div>
  );
}
