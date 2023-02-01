import React, {useEffect, useState} from "react";
import {loadBrokers, storeBrokers} from '../stores/brokerStore';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BrokersEditDialog from "./BrokersEditDialog";
import BrokersAddDialog from "./BrokersAddDialog";
import WebSocket, {sendPing} from "../soket";

export default function Brokers() {
    const [allBrokers, setAllBrokers] = useState('');
    const[update, setUpdate]=useState(false);
    const getBrokersFromServer = async () => {
        const response =  await fetch('http://localhost:4000/brokers');
        if (response.ok){
            let data = await response.json();
            storeBrokers.dispatch(loadBrokers(data));
            return data;
        }
    };
    useEffect(() => {
        getBrokersFromServer()
            .then(data => setAllBrokers(data));
        console.log("updated");
        setUpdate(false)
    }, [update]);
    const delBroker = async(e) => {
        await fetch('http://localhost:4000/delbroker' + e.target.value, {method: 'DELETE'});
        sendPing('addBroker', 'broker was deleted');
    };

    if(allBrokers !== ''){
        return (
            <>
                <WebSocket events={['newBroker']} updateCalls={[setUpdate]}/>
                <BrokersAddDialog />
                {allBrokers.map((val) => (
                    <Card className={'broker-card'} key = {val.id}>
                        <Card.Img src="images/1.png" style={{width: "100px"}}/>
                        <Card.Body>
                            <Card.Title>{val.name}</Card.Title>
                            <Card.Text>
                                Комиссия: {val['commission']}. Начальная сумма: {val['startMoney']}
                            </Card.Text>
                            <BrokersEditDialog id={val.id} name={val.name} commission={val['commission']} startMoney={val['startMoney']} />
                            <Button variant="btn btn-danger" value={val.id} onClick={delBroker}>Удалить</Button>
                        </Card.Body>
                    </Card>
                ))}
            </>
        );
    }
    return(
        <div>
            LOADING
        </div>
    );
}