import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './App.css';
import axios from './axios';

function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('/messages/sync').then((response) => {
            setMessages(response.data);
        });
    }, []);

    useEffect(() => {
        const pusher = new Pusher('d46b587269f7e80076f6', { cluster: 'ap2' });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function(newMessage) {
            setMessages([...messages, newMessage]);
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [messages]);

    console.log(messages);
    return (
        <div className='app'>
            <div className='app__body'>
                <Sidebar />
                <Chat messages={messages} />
            </div>
        </div>
    );
}

export default App;
