const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/oauth-server', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const createUser = async () => {
    try {
        const user = new User({
            username: 'user1',
            password: 'password1'
        });
        await user.save();
        console.log('User created');
    } catch (err) {
        console.error('Error creating user:', err);
    } finally {
        mongoose.connection.close();
    }
};

createUser().catch(console.error);