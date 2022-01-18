const express = require('express');
const cors = require('cors');
const connect = require('./connect')
const router = require('./route');
const cookieParser = require('cookie-parser')
const app = express();
const PORT  = process.env.PORT || 8000
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/auth',router);



process.on('SIGTERM',()=>{
    app.close(()=>{
        console.log('Server Auth terminated');
    })
})

app.listen(PORT,()=>{
    console.log(`server AUTH has been started on port:${PORT}`);
    connect.then(data=>{
        //console.log(data);
    }).catch(err=>{
        console.error(err);
        process.kill(process.pid,'SIGTERM')
    })
})




