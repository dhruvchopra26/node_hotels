const express = require('express');
const router = express.Router();
const MenuItem=require('../Models/MenuItem');

router.post('/', async (req,res)=>{
    try{
        const data=req.body;
        const newMenuItem = new MenuItem(data);
        const response= await newMenuItem.save();
        console.log('Data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server error occured');
    }
});

router.get('/:taste', async (req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste=='Spicy' || taste=='Sweet' || taste=='Sour'){
            const response = await MenuItem.find({taste : taste});
            console.log('Response Fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server error occured');
    }
});

module.exports=router;