const express = require("express");
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transactions.js');
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());


app.use(cors());
app.get('/apii/test', (req, res) => {
    res.json({ body: 'test ok' });
    
});
app.delete('/apii/transaction/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  await Transaction.findByIdAndDelete(id);
  res.json({ success: true });
});

app.post('/apii/transaction', 
    async(req, res)=>{
        
        await mongoose.connect (process.env.MONGO_URL);
        const{name, description,datetime, price}= req.body;

     const transaction =  await Transaction.create({ name, description,datetime,price});
    res.json(transaction);
});


app.get('/apii/transactions', async (req,res)=>{
await mongoose.connect (process.env.MONGO_URL);
 const transactions=  await Transaction.find();
 res.json(transactions)
})
app.listen(4000);
