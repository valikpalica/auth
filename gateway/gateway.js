const router = require('express').Router();
const fetch = require('node-fetch');
const option = require('./fetchOption.json');

router.get('/allAnceta',(req,res)=>{
    let url = option.url.concat(option.PathsApi.type_anceta,'/allAncetas');
    fetch(url).then(data=>{
        return data.json();
    }).then(data=>{
        res.status(200).json(data);
    }).catch(e=>{
        res.status(400).json(e);
    });
});

router.post('/quiz',(req,res)=>{
    let url = option.url.concat(option.PathsApi.type_anceta,'/quiz');
    fetch(url,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(req.body)
    }).then(data=>{
        return data.json();
    }).then(data=>{
        res.status(200).json(data);
    }).catch(e=>{
        res.status(400).json(e);
    })
});

router.get('/comanderQuiz',(req,res)=>{
    let url = option.url.concat(option.PathsApi.type_anceta,'/comanderQuiz');
    fetch(url).then(data=>{
       return data.json();
    }).then(data=>{
        res.status(200).json(data);
    }).catch(e=>{
        res.status(400).json(e);
    })
});

router.post('/setUser',(req,res)=>{
    let url = option.url.concat(option.PathsApi.type_anceta,'/setUser');
    fetch(url,{
        method:'POST',
        headers:{'Content-Type': 'application/json' },
        body:JSON.stringify(req.body)
    }).then(data=>{
        return data.json();
    }).then(data=>{
        res.status(200).json(data);
    }).catch(e=>res.status(400).json(e));
});

router.post('/checkUser',(req,res)=>{
    let url = option.url.concat(option.PathsApi.type_anceta,'/checkUser');
    fetch(url,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(req.body)
    }).then(data=>{
        return data.json();
    }).then(data=>{
        res.status(200).json(data)
    }).catch(e=>{
        res.status(400).json(e)
    })
});


module.exports = router;