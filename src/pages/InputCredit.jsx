import React, { useEffect, useState } from 'react';
import {styles} from '../styles/InputCreditStyle.module.css';
import Script from 'next/script'

// styles for VGS Collect fields
// const styles = {
//   fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI"',
// }

const CollectForm = () => {
  const [form, setForm] = useState({});
  const [isLoaded, scriptLoaded] = useState(false);

  // script loading
  useEffect(() => {
    const script = document.createElement("script");
    script.src = 'https://js.verygoodvault.com/vgs-collect/2.18.2/vgs-collect.js';
    script.async = true;
    script.onload = () => scriptLoaded(true);
    document.body.appendChild(script);
  });

  // VGS Collect initialization
  useEffect(() => {
    if (isLoaded) {
      const vgsForm = window.VGSCollect.create('tntsfeqzp4a', 'sandbox', (state) => {
        console.log(state);
      });
      setForm(vgsForm);

      vgsForm.field('#cc-holder', {
        type: 'text',
        name: 'card_holder',
        placeholder: 'Card holder',
        validations: ['required'],
        css: styles,
      });

      vgsForm.field('#cc-number', {
        type: 'card-number',
        name: 'card_number',
        successColor: '#4F8A10',
        errorColor: '#D8000C',
        placeholder: 'Card number',
        showCardIcon: true,
        validations: ['required', 'validCardNumber'],
        css: styles,
      });

      vgsForm.field('#cc-amount-money', {
        type: 'text',
        name: 'amount_money',
        successColor: '#4F8A10',
        errorColor: '#D8000C',
        placeholder: 'Amount of money',
        css: styles,
      });

      vgsForm.field('#cc-cvc', {
        type: 'card-security-code',
        name: 'card_cvc',
        successColor: '#4F8A10',
        errorColor: '#D8000C',
        placeholder: 'CVC',
        validations: ['required', 'validCardSecurityCode'],
        css: styles,
      });

      vgsForm.field('#cc-expiration-date', {
        type: 'card-expiration-date',
        name: 'card_exp',
        successColor: '#4F8A10',
        errorColor: '#D8000C',
        placeholder: 'MM / YY',
        validations: ['required', 'validCardExpirationDate'],
        css: styles,
      });
    }
  }, [isLoaded]);

  // VGS Collect form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    form.submit(
      '/post',
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
    <script type="text/javascript" src="https://js.verygoodvault.com/vgs-collect/2.18.2/vgs-collect.js"></script>
    <form onSubmit={handleSubmit} className="form">
      <div className="cc-amount-money">
        <div id="cc-amount-money" className="form-field"></div>
      </div>
      
      <div id="cc-holder" className="form-field"></div>
      <div id="cc-number" className="form-field"></div>
      <div className="form-field-group">
        <div id="cc-expiration-date" className="form-field"></div>
        <div id="cc-cvc" className="form-field"></div>
      </div>
      <button type="submit" className="form-button">Submit</button>
    </form>
    </>
  )
}

export default CollectForm;