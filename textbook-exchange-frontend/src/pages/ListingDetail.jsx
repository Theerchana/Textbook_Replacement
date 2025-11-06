import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";   // ✅ get :id from URL
import api from "../api";
import ExchangeModal from "../components/ExchangeModal";

export default function ListingDetail() {
  const { id } = useParams(); // this is your listingId from route
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [myBooks, setMyBooks] = useState([]);

  // fetch listing details
  useEffect(() => {
    api.get(`/api/books/${id}`).then((res) => setListing(res.data));
  }, [id]);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/transactions", {
        type: "sale",
        listingId: listing._id,
        price: listing.price,
      });
      alert("Transaction started! Transaction ID: " + res.data._id);
    } catch (err) {
      alert(err.response?.data?.message || "Error creating transaction");
    } finally {
      setLoading(false);
    }
  };

  const openExchangeModal = async () => {
    try {
      const res = await api.get("/api/books/my"); // endpoint to get user’s own books
      setMyBooks(res.data);
      setShowModal(true);
    } catch (err) {
      alert("Error loading your books.");
    }
  };

  const handleOfferExchange = async (offeredBook) => {
    try {
      const res = await api.post("/api/transactions", {
        type: "exchange",
        listingId: listing._id,
        offeredListingId: offeredBook._id,
      });
      alert("Exchange request sent! Transaction ID: " + res.data._id);
    } catch (err) {
      alert(err.response?.data?.message || "Error offering exchange");
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{listing.title}</h1>
      <p className="text-gray-600">Author: {listing.author}</p>
      <p className="mt-2">
        Price: {listing.price ? `₹${listing.price}` : "—"}
      </p>
      <p>Status: {listing.status}</p>

      {listing.status === "available" && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleBuy}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Buy
          </button>
          <button
            onClick={openExchangeModal}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Offer Exchange
          </button>
        </div>
      )}

      <ExchangeModal
        open={showModal}
        onClose={() => setShowModal(false)}
        myBooks={myBooks}
        onOffer={handleOfferExchange}
      />
    </div>
  );
}
