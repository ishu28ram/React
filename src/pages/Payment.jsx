import React, { useEffect, useState } from "react";
import { useContextAPI } from "../store/context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Payment = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    cardNumber: "",
    mm: "",
    yy: "",
    cvv: "",
  });
  const [total, setTotal] = useState(0);
  const { userData } = useContextAPI();

  useEffect(() => {
    async function getTotal() {
      try {
        const userRef = doc(db, "users", userData.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const total = userSnap.data().total || 0;
          const email = userSnap.data().email || "";
          setTotal(total);
          setInputs((prev) => ({
            ...prev,
            email: email,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    }
    getTotal();
  }, [userData]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  async function handlePayNow(e) {
    e.preventDefault();
    const { name, email, cvv, mm, yy, cardNumber } = inputs;
    if (!name && !email && !cvv && !mm && !yy && !cardNumber) {
      alert("please fill all field");
      return;
    }
    try {
      const userRef = doc(db, "users", userData.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        await updateDoc(userRef, {
          total: 0,
        });
        await updateDoc(userRef, {
          cart: [],
        });
        setTotal(0);
        setInputs({
          name: "",
          cardNumber: "",
          mm: "",
          yy: "",
          cvv: "",
        });
        alert(
          "Thank You choosing Zapcart, Your product will be delivered in 3 business days"
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center items-center">
      <form
        className="flex flex-col gap-5 min-w-[350px]"
        onSubmit={handlePayNow}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-xl">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={inputs.email}
            onChange={handleInputChange}
            className="border-gray-300 border-[2px] px-4 py-2 rounded-lg text-lg bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cardNumber" className="font-semibold text-xl">
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            id="card"
            placeholder="card number"
            value={inputs.cardNumber}
            onChange={handleInputChange}
            className="border-gray-300 border-[2px] px-4 py-2 rounded-lg text-lg"
            maxLength={16}
            required
          />
        </div>
        <div className="flex gap-8 flex-col sm:flex-row">
          <div className="flex gap-2 flex-col sm:flex-row">
            <div className="flex flex-col gap-2">
              <label htmlFor="mm" className="font-semibold text-xl">
                MM
              </label>
              <input
                type="number"
                name="mm"
                id="mm"
                placeholder="MM"
                value={inputs.mm}
                onChange={handleInputChange}
                className="border-gray-300 border-[2px] px-4 py-2 rounded-lg text-lg"
                maxLength={2}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="yy" className="font-semibold text-xl">
                YY
              </label>
              <input
                type="number"
                name="yy"
                id="yy"
                placeholder="YY"
                value={inputs.yy}
                onChange={handleInputChange}
                className="border-gray-300 border-[2px] px-4 py-2 rounded-lg text-lg"
                maxLength={2}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cvv" className="font-semibold text-xl">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              placeholder="cvv"
              value={inputs.cvv}
              onChange={handleInputChange}
              className="border-gray-300 border-[2px] px-4 py-2 rounded-lg text-lg"
              maxLength={3}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold text-xl">
            Card Holder Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="card holder name"
            value={inputs.name}
            onChange={handleInputChange}
            className="border-gray-300 border-[2px] px-4 py-2 rounded-lg text-lg"
            required
          />
        </div>
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl">Total</h1>
          <p className="font-semibold text-xl text-red-600">$ {total}</p>
        </div>
        <button
          type="submit"
          className="bg-customGreenBtn hover:bg-customGreenHoverBtn py-4 rounded-lg font-bold"
        >
          Pay now
        </button>
      </form>
    </div>
  );
};

export default Payment;
