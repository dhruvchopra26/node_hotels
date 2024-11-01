const express = require('express');
const router = express.Router();
const Person=require('../Models/person');
const {jwtAuthMiddleware,generateToken} = require('../jwt'); 

router.post('/signup', async (req,res)=>{
    try{
        const data=req.body;
        const newPerson = new Person(data);
        const response= await newPerson.save();
        console.log('Data saved');

        const payload = {
            id:response.id,
            username:response.username,
            email:response.email
        }

        const token = generateToken(payload);
        console.log("Token is : ", token)
        res.status(200).json({response : response, token : token});
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server error occured');
    }
});

//Login route
router.post('/login', async (req,res) => {
    try{
        const {username,password} = req.body;

        const user = await Person.findOne({username:username});

        if(!user || !(await user.comparePassword(password)))
            return res.status(401).json({error: 'Invalid username or password'});


        //generate token
        const payload = {
            id:user.id,
            username:user.username,
            email:user.email
        }
        const token = generateToken(payload);
        console.log("Token is : ", token)
        res.status(200).json({token : token});

    }
    catch(err){
        console.log(err);
        res.status(500).send('Server error occured');
    }
})

//Profile Route
router.get('/profile',jwtAuthMiddleware, async (req,res)=>{
    try{
        const userData= req.userPayload;
        if(!userData) return res.status(500).json({error: 'Invalid username or password'});
        console.log(userData);

        const userId=userData.id;
        const user= await Person.findById(userId);

        res.status(200).json({user});
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server error occured');
    }
})



router.get('/:workType',jwtAuthMiddleware, async (req,res)=>{
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