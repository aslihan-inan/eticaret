import React, { useState, useEffect } from "react";
import { Plus, Edit } from "lucide-react";
import api from "../api/api.js";

export default function CheckoutPage() {
  // --- Adres State ---
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: "", name: "", surname: "", phone: "",
    city: "", district: "", neighborhood: "", address: ""
  });

  // --- Kart State ---
  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [newCard, setNewCard] = useState({
    card_no: "", expire_month: "", expire_year: "", name_on_card: ""
  });
  const [showCardForm, setShowCardForm] = useState(false);
  const [isEditingCard, setIsEditingCard] = useState(false);

  // --- Adres input değişikliği ---
  const handleAddressChange = (e) => setNewAddress({...newAddress, [e.target.name]: e.target.value});

  // --- Adres kaydet ---
  const handleSaveAddress = () => {
    if (!newAddress.title || !newAddress.name || !newAddress.surname || !newAddress.phone || !newAddress.city) {
      alert("Lütfen tüm zorunlu alanları doldurun!");
      return;
    }
    const newAddrWithId = { ...newAddress, id: Date.now() };
    setAddresses([...addresses, newAddrWithId]);
    setNewAddress({ title: "", name: "", surname: "", phone: "", city: "", district: "", neighborhood: "", address: "" });
    setShowAddressForm(false);
  };

  // --- Kart işlemleri ---
  useEffect(() => { fetchCards(); }, []);

  const fetchCards = async () => {
    try {
      const res = await api.get("/user/card");
      setCards(res.data);
    } catch (err) {
      console.error("Kartları çekerken hata:", err.response?.data || err.message);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/card", {
        ...newCard,
        expire_month: Number(newCard.expire_month),
        expire_year: Number(newCard.expire_year)
      });
      setCards(prev => [...prev, res.data]);
      resetCardForm();
      alert("Kart başarıyla kaydedildi ✅");
    } catch (err) {
      console.error(err);
      alert(`Kart eklenirken hata: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleUpdateCard = async (e) => {
    e.preventDefault();
    try {
      await api.put("/user/card", {
        id: selectedCardId,
        ...newCard,
        expire_month: Number(newCard.expire_month),
        expire_year: Number(newCard.expire_year)
      });
      fetchCards();
      resetCardForm();
      alert("Kart başarıyla güncellendi ✅");
    } catch (err) {
      console.error(err);
      alert(`Kart güncellenirken hata: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDeleteCard = async (id) => {
    if (!window.confirm("Bu kartı silmek istediğinizden emin misiniz?")) return;
    try {
      await api.delete(`/user/card/${id}`);
      fetchCards();
      alert("Kart başarıyla silindi ✅");
    } catch (err) {
      console.error(err);
      alert(`Kart silinirken hata: ${err.response?.data?.message || err.message}`);
    }
  };

  const resetCardForm = () => {
    setNewCard({ card_no: "", expire_month: "", expire_year: "", name_on_card: "" });
    setShowCardForm(false);
    setIsEditingCard(false);
    setSelectedCardId(null);
  };

  const startEditingCard = (card) => {
    setNewCard({...card});
    setSelectedCardId(card.id);
    setIsEditingCard(true);
    setShowCardForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* --- Sol Alan: Adres ve Kartlar --- */}
      <div className="lg:col-span-2 space-y-6">
        {/* --- Adresler --- */}
        <div className="border rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">1. Adres Bilgileri</h2>
          <button onClick={() => setShowAddressForm(true)} className="flex items-center justify-center border-2 border-dashed rounded-xl p-6 text-gray-500 hover:bg-gray-50">
            <Plus className="mr-2" /> Yeni Adres Ekle
          </button>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {addresses.map(addr => (
              <div key={addr.id} onClick={() => setSelectedAddressId(addr.id)} className={`border rounded-xl p-4 cursor-pointer relative ${selectedAddressId === addr.id ? "border-orange-500" : "border-gray-200"}`}>
                <h4 className="font-semibold">{addr.title}</h4>
                <p className="text-sm">{addr.name} {addr.surname}</p>
                <p className="text-sm text-gray-600">{addr.phone}</p>
                <p className="text-sm text-gray-600">{addr.city} / {addr.district}</p>
                <p className="text-sm text-gray-600">{addr.neighborhood}</p>
                <button className="absolute top-2 right-2 text-sm text-blue-500 flex items-center">
                  <Edit size={14} className="mr-1" /> Düzenle
                </button>
              </div>
            ))}
          </div>

          {showAddressForm && (
            <div className="mt-6 border-t pt-4 space-y-3">
              <input name="title" placeholder="Adres Başlığı" value={newAddress.title} onChange={handleAddressChange} className="w-full border rounded p-2 text-sm"/>
              <input name="name" placeholder="Ad" value={newAddress.name} onChange={handleAddressChange} className="w-full border rounded p-2 text-sm"/>
              <input name="surname" placeholder="Soyad" value={newAddress.surname} onChange={handleAddressChange} className="w-full border rounded p-2 text-sm"/>
              <input name="phone" placeholder="Telefon" value={newAddress.phone} onChange={handleAddressChange} className="w-full border rounded p-2 text-sm"/>
              <select name="city" value={newAddress.city} onChange={handleAddressChange} className="w-full border rounded p-2 text-sm">
                <option value="">Şehir Seç</option>
                <option value="İstanbul">İstanbul</option>
                <option value="Ankara">Ankara</option>
                <option value="İzmir">İzmir</option>
              </select>
              <input name="district" placeholder="İlçe" value={newAddress.district} onChange={handleAddressChange} className="w-full border rounded p-2 text-sm"/>
              <input name="neighborhood" placeholder="Mahalle" value={newAddress.neighborhood} onChange={handleAddressChange} className="w-full border rounded p-2 text-sm"/>
              <textarea name="address" placeholder="Adres Detayı" value={newAddress.address} onChange={handleAddressChange} className="w-full border rounded p-2 text-sm"/>
              <div className="flex space-x-2">
                <button onClick={handleSaveAddress} className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">Kaydet</button>
                <button onClick={() => setShowAddressForm(false)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">İptal</button>
              </div>
            </div>
          )}
        </div>

        {/* --- Kartlar --- */}
        <div className="border rounded-2xl p-4 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">2. Ödeme Seçenekleri</h2>
          {cards.length === 0 ? <p className="text-gray-500 text-sm">Henüz kayıtlı kart yok.</p> : cards.map(card => (
            <div key={card.id} className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer ${selectedCardId===card.id?"border-orange-500":"border-gray-200"}`} onClick={()=>setSelectedCardId(card.id)}>
              <div>
                <p className="text-sm font-medium">{card.name_on_card}</p>
                <p className="text-xs text-gray-500">**** **** **** {card.card_no.slice(-4)} | {card.expire_month}/{card.expire_year}</p>
              </div>
              <div className="flex space-x-3">
                <button onClick={(e)=>{e.stopPropagation(); startEditingCard(card)}} className="text-blue-500 text-xs hover:underline">Düzenle</button>
                <button onClick={(e)=>{e.stopPropagation(); handleDeleteCard(card.id)}} className="text-red-500 text-xs hover:underline">Sil</button>
              </div>
            </div>
          ))}
          {!showCardForm && <button onClick={()=>setShowCardForm(true)} className="text-sm text-blue-600 hover:underline">+ Yeni Kart Ekle</button>}
          {showCardForm && (
            <form onSubmit={isEditingCard?handleUpdateCard:handleAddCard} className="space-y-3 mt-2">
              <input type="text" placeholder="Kart Numarası" value={newCard.card_no} onChange={e=>setNewCard({...newCard, card_no:e.target.value})} className="w-full border p-2 rounded-lg" required/>
              <div className="flex space-x-2">
                <input type="number" placeholder="Ay" value={newCard.expire_month} onChange={e=>setNewCard({...newCard, expire_month:e.target.value})} className="w-1/2 border p-2 rounded-lg" required/>
                <input type="number" placeholder="Yıl" value={newCard.expire_year} onChange={e=>setNewCard({...newCard, expire_year:e.target.value})} className="w-1/2 border p-2 rounded-lg" required/>
              </div>
              <input type="text" placeholder="Kart Üzerindeki İsim" value={newCard.name_on_card} onChange={e=>setNewCard({...newCard, name_on_card:e.target.value})} className="w-full border p-2 rounded-lg" required/>
              <div className="flex space-x-2">
                <button type="submit" className="flex-1 bg-orange-500 text-white py-2 rounded-lg">{isEditingCard?"Güncelle":"Kaydet"}</button>
                <button type="button" onClick={resetCardForm} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">İptal</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* --- Sağ Alan: Sipariş Özeti --- */}
      <div className="border rounded-2xl p-4 shadow-sm h-fit">
        <h2 className="text-lg font-semibold mb-4">Sipariş Özeti</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Ürünün Toplamı</span><span>8.448,99 TL</span></div>
          <div className="flex justify-between"><span>Kargo Toplam</span><span>29,99 TL</span></div>
          <div className="flex justify-between text-green-600"><span>150 TL ve Üzeri Kargo Bedava</span><span>-29,99 TL</span></div>
          <div className="border-t pt-2 flex justify-between font-semibold"><span>Toplam</span><span>8.448,99 TL</span></div>
        </div>
        <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600">Ödeme Yap</button>
      </div>
    </div>
  );
}
