import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4020/', { transports : ['websocket'] });

const sendPing = (event, arg) => {
    socket.emit(event, arg);
}

export default function WebSocket(props) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });
        for (let i = 0; i < props.events.length; i++) {
            socket.on(props.events[i], (message) => {
                console.log("socket: " + message)
                props.updateCalls[i](message);
                setLastPong(message);
            });
        }

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    return (
        <div>
        </div>
    );
}

export {sendPing};