const router = require("express").Router(); 
require('dotenv').config();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.post("/payments", (req,res) => {

    console.log("Entered Stripe API");

    stripe.charges.create({
        source :req.body.tokenId,
        amount : req.body.amount,
        currency : "usd",
        description : 'test payment',
    },(striperr,stripresp) =>
    {
        if(striperr)
        {
        res.status(500).json(striperr);
        throw striperr;
        }
        else{
            res.status(201).json(stripresp); 
        }
    }
    )
});

module.exports = router;
