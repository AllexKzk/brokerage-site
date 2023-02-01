import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import StockChart from "./StockChart";

export default function Stock(){
    const [stocks, setStocks] = useState([]);
    const getStocksFromServer = async() => {
        const response =  await fetch('http://localhost:4000/stock');
        if (response.ok)
            return await response.json();
        else
            return null;
    };
    useEffect(() => {
        getStocksFromServer()
            .then(data => {
                if (data)
                    setStocks(data);
            });
    }, [])
    return (
      <>
          {stocks.map((val) => (
              <Card className={'broker-card'} key = {val.id}>
                  <Card.Body>
                      <Card.Title>{val.company} ({val.stock})</Card.Title>
                      <StockChart stock={val.stock}/>
                  </Card.Body>
              </Card>
          ))}
      </>
    );
}