import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [addBooks, setAddBooks] = useState([]);
  const [sellBooks, setSellBooks] = useState([]);
  const [exchangeBooks, setExchangeBooks] = useState([]);

  // 🧭 Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const storedAddBooks = JSON.parse(localStorage.getItem("books") || "[]");
      const storedSellBooks = JSON.parse(localStorage.getItem("sellBooks") || "[]");
      const storedExchangeBooks = JSON.parse(localStorage.getItem("exchangeBooks") || "[]");

      setUsers(storedUsers);
      setAddBooks(storedAddBooks);
      setSellBooks(storedSellBooks);
      setExchangeBooks(storedExchangeBooks);
    };

    loadData();
    window.addEventListener("storage", loadData);
    window.addEventListener("users-updated", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
      window.removeEventListener("users-updated", loadData);
    };
  }, []);

  // 🧹 Delete a user
  const handleDeleteUser = (email) => {
    if (window.confirm(`Are you sure you want to delete ${email}?`)) {
      const updated = users.filter((u) => u.email !== email);
      localStorage.setItem("users", JSON.stringify(updated));
      setUsers(updated);
      alert(`Deleted user: ${email}`);
    }
  };

  // 🧹 Delete a book
  const handleDeleteBook = (type, id) => {
    let key = "";
    if (type === "add") key = "books";
    if (type === "sell") key = "sellBooks";
    if (type === "exchange") key = "exchangeBooks";

    const list = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = list.filter((b) => b.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));

    if (type === "add") setAddBooks(updated);
    if (type === "sell") setSellBooks(updated);
    if (type === "exchange") setExchangeBooks(updated);

    alert(`Deleted ${type} book successfully`);
  };

  // 🚪 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "/admin-login";
  };

  // 📄 Generate PDF Report
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Admin Dashboard Report", 14, 15);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 23);

      let y = 30;

      // Users Table
      doc.setFont("helvetica", "bold");
      doc.text("Registered Users", 14, y);
      doc.setFont("helvetica", "normal");

      if (users.length > 0) {
        autoTable(doc, {
          startY: y + 5,
          head: [["Name", "Email", "Role"]],
          body: users.map((u) => [u.name, u.email, u.role || "User"]),
          theme: "grid",
          headStyles: { fillColor: [41, 128, 185], textColor: 255 },
          alternateRowStyles: { fillColor: [245, 245, 245] },
        });
        y = doc.lastAutoTable.finalY + 10;
      } else {
        doc.text("No registered users.", 14, y + 10);
        y += 20;
      }

      // Added Books
      doc.setFont("helvetica", "bold");
      doc.text("Added Books", 14, y);
      doc.setFont("helvetica", "normal");

      if (addBooks.length > 0) {
        autoTable(doc, {
          startY: y + 5,
          head: [["Title", "Author", "Owner"]],
          body: addBooks.map((b) => [b.title || "-", b.author || "-", b.owner || "-"]),
          theme: "grid",
          headStyles: { fillColor: [41, 128, 185], textColor: 255 },
          alternateRowStyles: { fillColor: [245, 245, 245] },
        });
        y = doc.lastAutoTable.finalY + 10;
      } else {
        doc.text("No added books.", 14, y + 10);
        y += 20;
      }

      // Sell Books
      doc.setFont("helvetica", "bold");
      doc.text("Sell Books", 14, y);
      doc.setFont("helvetica", "normal");

      if (sellBooks.length > 0) {
        autoTable(doc, {
          startY: y + 5,
          head: [["Title", "Author", "Price (₹)", "Owner"]],
          body: sellBooks.map((b) => [
            b.title || "-",
            b.author || "-",
            b.price || "-",
            b.owner || "-",
          ]),
          theme: "grid",
          headStyles: { fillColor: [41, 128, 185], textColor: 255 },
          alternateRowStyles: { fillColor: [245, 245, 245] },
        });
        y = doc.lastAutoTable.finalY + 10;
      } else {
        doc.text("No sell books.", 14, y + 10);
        y += 20;
      }

      // Exchange Books
      doc.setFont("helvetica", "bold");
      doc.text("Exchange Books", 14, y);
      doc.setFont("helvetica", "normal");

      if (exchangeBooks.length > 0) {
        autoTable(doc, {
          startY: y + 5,
          head: [["Title", "Author", "Owner"]],
          body: exchangeBooks.map((b) => [
            b.title || "-",
            b.author || "-",
            b.owner || "-",
          ]),
          theme: "grid",
          headStyles: { fillColor: [41, 128, 185], textColor: 255 },
          alternateRowStyles: { fillColor: [245, 245, 245] },
        });
      } else {
        doc.text("No exchange books.", 14, y + 10);
      }

      // Save PDF
      doc.save("AdminDashboard_Report.pdf");
      alert("✅ PDF Report downloaded successfully!");
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("❌ Failed to generate PDF. Check console for details.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Admin Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Download Report (PDF)
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Registered Users */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Registered Users</h2>
        {users.length === 0 ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            <p>No registered users yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-t hover:bg-gray-100">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2 capitalize">{u.role}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteUser(u.email)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Added Books */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Added Books</h2>
        {addBooks.length === 0 ? (
          <div className="bg-gray-100 p-4 rounded">No added books yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Author</th>
                  <th className="p-2">Owner</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {addBooks.map((b) => (
                  <tr key={b.id} className="border-t hover:bg-gray-100">
                    <td className="p-2">{b.title}</td>
                    <td className="p-2">{b.author}</td>
                    <td className="p-2">{b.owner}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteBook("add", b.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Sell Books */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Sell Books</h2>
        {sellBooks.length === 0 ? (
          <div className="bg-gray-100 p-4 rounded">No books for sale yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Author</th>
                  <th className="p-2">Price (₹)</th>
                  <th className="p-2">Owner</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellBooks.map((b) => (
                  <tr key={b.id} className="border-t hover:bg-gray-100">
                    <td className="p-2">{b.title}</td>
                    <td className="p-2">{b.author}</td>
                    <td className="p-2">{b.price}</td>
                    <td className="p-2">{b.owner}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteBook("sell", b.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Exchange Books */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Exchange Books</h2>
        {exchangeBooks.length === 0 ? (
          <div className="bg-gray-100 p-4 rounded">No exchange books yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-yellow-600 text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Author</th>
                  <th className="p-2">Owner</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exchangeBooks.map((b) => (
                  <tr key={b.id} className="border-t hover:bg-gray-100">
                    <td className="p-2">{b.title}</td>
                    <td className="p-2">{b.author}</td>
                    <td className="p-2">{b.owner}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteBook("exchange", b.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
