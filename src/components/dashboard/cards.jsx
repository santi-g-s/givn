import { useEffect, useState } from 'react';
import Script from 'next/script'
import axios from "axios"



export default function CardsPage(props) {

  const customerID = props.customerID;

  const [cardID, setCardID] = useState('');

  const fetchData = async () => {
    const res =  await axios.get(`${process.env.NEXT_PUBLIC_UNIT_API_URL}/cards/?filter[customerId]=${customerID}`, {
      headers: {
        'Authorization': 'Bearer '+ process.env.NEXT_PUBLIC_UNIT_TOKEN
      }
    })
    setCardID(res.data.data[0].id);
    console.log(res.data.data[0].id);
  }

  useEffect(() => {
    fetchData();
    }, []
  );

  return (
    <>
        <Script src="https://ui.s.unit.sh/components.js" />
        {
          cardID != '' ? 
          (
            <unit-elements-card
              card-id={cardID}
              customer-token={process.env.NEXT_PUBLIC_UNIT_TOKEN}
              theme=""
            >
            </unit-elements-card>
          ) : (<div></div>)
        }
        
        
    </>
  );
}