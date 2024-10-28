const express = require('express');
const router = express.Router();
const Person=require('../Models/person');

router.post('/', async (req,res)=>{
    try{
        const data=req.body;
        const newPerson = new Person(data);
        const response= await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server error occured');
    }
});

router.get('/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType=='chef' || workType=='waiter' || workType=='manager'){
            const response = await Person.find({work : workType});
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

router.put('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const updatedPersonsData=req.body;

        const response = await Person.findByIdAndUpdate(id,updatedPersonsData,{
            new:true,
            runValidators:true
        })

        if(!response){
            res.status(404).json({error:'Person not found'})
        }

        console.log('Data Updated Successfully');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server error occured');
    }
});

router.delete('/:id', async (req,res)=>{
    try{
        const id = req.params.id;

        const response = await Person.findByIdAndDelete(id);

        if(!response){
            res.status(404).json({error:'Person not found'})
        }

        console.log('Data Deleted Successfully');
        res.status(200).json({message:'Person Deleted Successfully!'});
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server error occured');
    }
});

module.exports=router;