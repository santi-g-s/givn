import { useEffect, useState } from 'react';
import { Container, Grid } from '@mantine/core';
import Script from 'next/script'
import axios from "axios"
import { useAuth } from '@/contexts/AuthContext';

export default function CardsPage() {

  const [cardIDs, setCardIDs] = useState([]);

  const auth = useAuth();

  const fetchData = async () => {
    if (!auth?.currentUser?.uid) {
      return
    }
    
    const resAPI = await axios.get(`/api/fetch-card/${auth?.currentUser?.uid}`)

    console.log(resAPI.data.result[0].cardId);

    const res = await axios.get(`${process.env.NEXT_PUBLIC_UNIT_API_URL}/cards/${resAPI.data.result[0].cardId}`, {
      headers: {
        'Authorization': 'Bearer '+ process.env.NEXT_PUBLIC_UNIT_TOKEN
      }
    })
    console.log(res);
    setCardIDs([res.data.data.id])
  }

  useEffect(() => {
    fetchData();
    }, [auth?.currentUser]
  );

  return (
    <Container my="xl">
      <Script src="https://ui.s.unit.sh/components.js" />
        <Grid>
          {
            cardIDs.map(function(id){
              
                return <Grid.Col span={12}>
                        <unit-elements-card
                          card-id={id}
                          customer-token={process.env.NEXT_PUBLIC_UNIT_TOKEN}
                          theme=""
                          key={id}
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