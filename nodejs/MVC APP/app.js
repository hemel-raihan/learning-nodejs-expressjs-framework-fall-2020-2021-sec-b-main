//declaration
const express 		= require('express');
const fileupload = require('express-fileupload');
const bodyParser 	= require('body-parser');
const exSession 	= require('express-session');
const cookieParser 	= require('cookie-parser');
const login			= require('./controller/login');
const home			= require('./controller/home');
const logout		= require('./controller/logout');
const user			= require('./controller/user');
const post			= require('./controller/post');
const app 			= express();

//config
app.set('view engine', 'ejs');

//middleware
app.use('/abc', express.static('assets'));
app.use(fileupload());
app.use(bodyParser.urlencoded({extended: true}));
app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false }));
app.use(cookieParser());

app.use('/login', login);
app.use('/home', home);
app.use('/logout', logout);
app.use('/user', user);
app.use('/post', post);

//route
app.get('/', (req, res)=>{
	res.send('Hello from express server');	
});

//server startup
app.listen(3029, (error)=>{
	console.log('express server started at 3000...');
});