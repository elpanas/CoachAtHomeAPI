require('dotenv').config()
const express = require('express'), // framework nodejs
    mongoose = require('mongoose'), // framework mongoDB 
    restcoach = require('./routes/restcoach'),
    url = process.env.DB_URI; // remote db connection string

const app = express();

app.use(express.json()); // built-in middleware

const connOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

// connection to db
mongoose.connect(url, connOpts)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// in case of web request
app.get('/', (req, res) => {
    res.send('YourCoach Web Service');
});

// every request calls a different script based on its path
//app.use(express.static(__dirname)); // static calls
app.use('/api/coach', restcoach);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
