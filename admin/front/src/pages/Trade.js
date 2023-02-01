import Card from "react-bootstrap/Card";
import React, {useEffect, useState} from "react";
import WebSocket from "../soket";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export default function Trade(props){
    const [stocksCost, setCost] = useState([]);
    useEffect(() => {
        if (stocksCost.length)
            props.setDay(stocksCost[0].date);
        console.log(stocksCost);
    }, [stocksCost])
    return (
      <>
          <WebSocket events={['tradeStarted', 'tradeStatus']} updateCalls={[setCost, props.setStatus]}/>
          {stocksCost.map((val) => (
              <Card className={'broker-card'} key={'stock' + val.stock}>
                  <Card.Body>
                      <Card.Title>{val.stock}</Card.Title>
                      <Card.Text> Стоимость: {val.cost} </Card.Text>
                      <Card.Text style={{color: val.ratio > 0 ? 'green' : 'red'}}>
                          {val.ratio}%
                          {val.ratio > 0 ? <BsChevronUp></BsChevronUp> : <BsChevronDown></BsChevronDown> }
                      </Card.Text>
                  </Card.Body>
              </Card>
          ))}
      </>
    );
}