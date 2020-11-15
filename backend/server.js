const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
//bring routes
const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag')
const formRoutes = require('./routes/form');
//app
const app = express();

//db
mongoose.connect(process.env.PRODUCTION_DATABASE,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false 
}).then(()=>console.log("database connected"))

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cookieParser());
//cors
if(process.env.NODE_ENV === 'development'){
    app.use(cors({ origin: `${process.env.PRODUCTION_URL}`}));
}
//routes middleware
app.use('/api',blogRoutes);
app.use('/api',authRoutes);
app.use('/api',usersRoutes);
app.use('/api',categoryRoutes);
app.use('/api',tagRoutes);
app.use('/api',formRoutes); 


//port
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`the port ${port} is active`)
})