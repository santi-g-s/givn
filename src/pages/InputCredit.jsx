import React, { useEffect, useState } from "react";
import { Input } from "@mantine/core";
import styles from "../styles/InputCreditStyle.module.css";

const CollectForm = () => {
  const [form, setForm] = useState({});
  const [isLoaded, scriptLoaded] = useState(false);
  const [amount, setAmount] = useState("0.00");

  // script loading
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://js.verygoodvault.com/vgs-collect/2.18.2/vgs-collect.js";
    script.async = true;
    script.onload = () => scriptLoaded(true);
    document.body.appendChild(script);
  });

  // VGS Collect initialization
  useEffect(() => {
    if (isLoaded) {
      const vgsForm = window.VGSCollect.create(
        "tntsfeqzp4a",
        "sandbox",
        (state) => {}
      );
      setForm(vgsForm);

      vgsForm.field("#cc-holder", {
        type: "text",
        name: "card_holder",
        placeholder: "Card Holder",
        validations: ["required"],
        css: styles,
      });

      vgsForm.field("#cc-number", {
        type: "card-number",
        name: "card_number",
        successColor: "#4F8A10",
        errorColor: "#D8000C",
        placeholder: "Card Number",
        showCardIcon: true,
        validations: ["required", "validCardNumber"],
        css: styles,
      });

      vgsForm.field("#cc-cvc", {
        type: "card-security-code",
        name: "card_cvc",
        successColor: "#4F8A10",
        errorColor: "#D8000C",
        placeholder: "- - -",
        maxLength: 3,
        validations: ["required", "validCardSecurityCode"],
        css: styles,
        showCardIcon: true,
      });

      vgsForm.field("#cc-expiration-date", {
        type: "card-expiration-date",
        name: "card_exp",
        successColor: "#4F8A10",
        errorColor: "#D8000C",
        placeholder: "MM / YY",
        validations: ["required", "validCardExpirationDate"],
        css: styles,
      });
    }
  }, [isLoaded]);

  // VGS Collect form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    form.submit(
      "/post",
      {},
      (status, response) => {
        console.log(status, response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <script
        type="text/javascript"
        src="https://js.verygoodvault.com/vgs-collect/2.18.2/vgs-collect.js"
      />
      <form
        onSubmit={handleSubmit}
        className="form flex flex-col justify-center items-center gap-y-4"
      >
        <div className="flex flex-row items-end">
          <p className="text-3xl md:text-5xl mb-2">$</p>
          <input
            placeholder="0.00"
            className="ml-2 text-5xl md:text-7xl outline-none text-center w-full h-fit"
            style={{ width: Math.min(Math.max(amount.length, 4), 50) + "ch" }}
            value={amount}
            maxLength={7}
            onChange={(event) => {
              setAmount(event.target.value);
            }}
          />
        </div>
        <Input.Wrapper id="cardHolder" label={"Card Holder"} required>
          <div
            id="cc-holder"
            className=" mt-2 h-9 border rounded border-[#ced4da] px-3 font-poppins"
          />
        </Input.Wrapper>
        <Input.Wrapper id="cardNumber" label={"Card Number"} required>
          <div
            id="cc-number"
            className=" mt-2 h-9 border rounded border-[#ced4da] px-3 font-poppins"
          />
        </Input.Wrapper>
        <Input.Wrapper id="cvc" label={"CVC"} required>
          <div
            id="cc-cvc"
            className=" mt-2 h-9 border rounded border-[#ced4da] px-3 font-poppins"
          />
        </Input.Wrapper>
        <Input.Wrapper id="expiration" label={"Expiration"} required>
          <div
            id="cc-expiration-date"
            className=" mt-2 h-9 border rounded border-[#ced4da] px-3 font-poppins"
          />
        </Input.Wrapper>
        <button
          type="submit"
          className="form-buttom bg-blue-500 mt-4 border rounded-lg px-4 py-2 text-white hover:bg-blue-700 transition hover:border-white"
        >
          Donate
        </button>
      </form>
    </>
  );
};

export default CollectForm;
