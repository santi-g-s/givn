import React from 'react';
import Script from 'next/script'

export default function MyComponent() {
  return (
    <>
    <Script src="https://ui.s.unit.sh/components.js"/>  
    <div className="min-h-screen">
      <h1>My Component</h1>
      <unit-elements-book-payment
        account-id="1199623"
        counterparty-name="Peter Parker"
        counterparty-account-id="1221257"
        is-same-customer={true}
        // theme=""
        customer-token={process.env.NEXT_PUBLIC_UNIT_TOKEN}
      ></unit-elements-book-payment>
    </div>
    </>
  );
}