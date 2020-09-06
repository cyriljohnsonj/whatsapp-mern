//Imports
import express from 'express';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import Messages from './dbMessages.js';
import cors from 'cors';

// Configs
const port = process.env.PORT || 9000;

const app = express();
app.use(express.json());
app.use(cors());

const connectionUrl = 'mongodb+srv://admin:mayflower@cluster0.olz3c.mongodb.net/whatsappdb>?retryWrites=true&w=majority'
mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const pusher = new Pusher({
    appId: '1067740',
    key: 'd46b587269f7e80076f6',
    secret: 'c75492d5f564addd2e93',
    cluster: 'ap2',
    encrypted: true
});

const db = mongoose.connection
db.once('open', () => {
    console.log('DB Connected');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();
    changeStream.on('change', (change) => {
        console.log('Change Detected', change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received,
                }
            );
        } else {
            console.log('Error triggering Pusher');
        }
    });
});

// Routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n${data}`)
        }
    });
});

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
});

app.listen(port, () => console.log(`Listening on host: ${port}`));

