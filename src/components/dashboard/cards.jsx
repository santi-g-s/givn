import { useEffect, useState } from 'react';
import { Container, Grid } from '@mantine/core';
import Script from 'next/script'
import axios from "axios"



export default function CardsPage(props) {

  const customerID = props.customerID;

  const [cardIDs, setCardIDs] = useState([]);

  const fetchData = async () => {
    const res =  await axios.get(`${process.env.NEXT_PUBLIC_UNIT_API_URL}/cards/?filter[customerId]=${customerID}`, {
      headers: {
        'Authorization': 'Bearer '+ process.env.NEXT_PUBLIC_UNIT_TOKEN
      }
    })
    setCardIDs(res.data.data)
  }

  useEffect(() => {
    fetchData();
    }, []
  );

  return (
    <Container my="xl">
      <Script src="https://ui.s.unit.sh/components.js" />
        <Grid>
          {
            cardIDs.map(function(card){
              
                return <Grid.Col span={6}>
                        <unit-elements-card
                          card-id={card.id}
                          customer-token={process.env.NEXT_PUBLIC_UNIT_TOKEN}
                          theme=""
                          key={card.id}
                          hide-sensitive-data-button="true"
                        >
                        </unit-elements-card>
                      </Grid.Col>; 
              
            })
          }
        </Grid>
    </Container>
  );
}