var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var productsRoute = require('./routes/productsRoutes');
var strategiesRoutes = require('./routes/strategiesRoutes');
var accountRoutes = require('./routes/accountRoutes');
var authRoutes = require('./routes/authRoutes');
var cors = require('cors');
const account = require('./models/account');
const { requireAuth } = require('./middlewares/authMiddlewares');

//set up server

const port = process.env.PORT || 3000;
const dbURI = 'mongodb://localhost/selling-management';





app.set('view engine', 'ejs');
// static files
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(authRoutes);


app.get('/', requireAuth,(req, res) => {
    res.render('management');
});



app.use('/api',requireAuth,accountRoutes, productsRoute, strategiesRoutes);


{/*
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};
*/}

io.on('connection', socket => {
    console.log('user connected');
})



mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        http.listen(port, () => {
            console.log('webserver is listening is port *:' + port);
        });
    })
    .catch(err => console.log(err));

app.use((req, res)=>{ res.render('404')});
