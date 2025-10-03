const mongoose = require('mongoose');
const Client = require('../models/client');

mongoose.connect('mongodb://localhost:27017/oauth-server', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const createClient = async () => {
    const client = new Client({
        id: 'client1',
        secret: 'secret1',
        redirectUris: ['http://localhost:3000/callback']
    });
    await client.save();
    console.log('Client created');
    mongoose.connection.close();
};

createClient().catch(console.error);