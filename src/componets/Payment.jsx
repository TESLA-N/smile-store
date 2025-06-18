// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import CircularProgress from "@mui/material/CircularProgress";
// import QRCode from "react-qr-code";
// const location = useLocation();
// const { products, total, fromCart } = location.state || {};
// const PaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [products, setProducts] = useState([]);
//   const [fromCart, setFromCart] = useState(false);
//   const [method, setMethod] = useState("upi");
//   const [processing, setProcessing] = useState(false);

//   const [upiId, setUpiId] = useState("");
//   const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });

//   useEffect(() => {
//     const state = location.state;
//     if (state?.products) {
//       setProducts(state.products);
//       setFromCart(state.fromCart);
//     }
//   }, [location.state]);

//   const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   const handlePayment = async () => {
//     setProcessing(true);
//     setTimeout(async () => {
//       if (fromCart) {
//         await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart/clear`, {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }).catch((e) => console.error("Cart clear error:", e));
//       }

//       setProcessing(false);
//       navigate("/payment-success", {
//         state: { products, total },
//       });
//     }, 2500);
//   };

//   const isValid = () => {
//     if (method === "upi") return upiId.trim().includes("@");
//     if (method === "card") return card.number && card.expiry && card.cvv;
//     return true; // For QR and COD
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
//       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h2 className="text-xl font-bold text-center mb-6 text-blue-600">Choose Payment Method</h2>

//         <div className="flex justify-around mb-4">
//           {["upi", "card", "qr", "cod"].map((m) => (
//             <button
//               key={m}
//               onClick={() => setMethod(m)}
//               className={`capitalize px-4 py-2 rounded-lg ${
//                 method === m ? "bg-blue-600 text-white" : "bg-gray-100"
//               }`}
//             >
//               {m === "upi" && "UPI"}
//               {m === "card" && "Card"}
//               {m === "qr" && "Scan & Pay"}
//               {m === "cod" && "Cash on Delivery"}
//             </button>
//           ))}
//         </div>

//         <div className="mb-6">
//           {method === "upi" && (
//             <div className="space-y-2">
//               <label className="block text-sm font-medium">Enter UPI ID</label>
//               <input
//                 type="text"
//                 placeholder="example@upi"
//                 className="w-full border rounded px-3 py-2"
//                 value={upiId}
//                 onChange={(e) => setUpiId(e.target.value)}
//               />
//             </div>
//           )}

//           {method === "card" && (
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium">Card Number</label>
//                 <input
//                   type="text"
//                   placeholder="1234 5678 9012 3456"
//                   className="w-full border rounded px-3 py-2"
//                   value={card.number}
//                   onChange={(e) => setCard({ ...card, number: e.target.value })}
//                 />
//               </div>
//               <div className="flex gap-4">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium">Expiry</label>
//                   <input
//                     type="text"
//                     placeholder="MM/YY"
//                     className="w-full border rounded px-3 py-2"
//                     value={card.expiry}
//                     onChange={(e) => setCard({ ...card, expiry: e.target.value })}
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium">CVV</label>
//                   <input
//                     type="password"
//                     placeholder="123"
//                     className="w-full border rounded px-3 py-2"
//                     value={card.cvv}
//                     onChange={(e) => setCard({ ...card, cvv: e.target.value })}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {method === "qr" && (
//             <div className="text-center space-y-2">
//               <p className="text-sm text-gray-700">Scan this QR using any UPI app</p>
//               <div className="inline-block bg-white p-4 rounded">
//                 <QRCode value="upi://pay?pa=demo@upi&pn=SmileStore&am=100" size={150} />
//               </div>
//             </div>
//           )}

//           {method === "cod" && (
//             <p className="text-sm text-gray-600">
//               Pay in cash when the order is delivered to your address.
//             </p>
//           )}
//         </div>

//         <button
//           disabled={processing || !isValid()}
//           onClick={handlePayment}
//           className={`w-full py-2 rounded-xl font-semibold ${
//             processing || !isValid()
//               ? "bg-blue-300 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           } text-white flex justify-center items-center gap-2`}
//         >
//           {processing ? (
//             <>
//               <CircularProgress size={20} color="inherit" />
//               Processing...
//             </>
//           ) : (
//             "Pay Now"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
