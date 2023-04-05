import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/faucet',  async (req, res) => {
    
    console.log(req.body.address)

    const response = await fetch('https://faucet.devnet.sui.io/gas', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            FixedAmountRequest: {
                recipient: req.body.address,
            },
        })
    })

    res.status(response.status).json({
        "address": req.body.address
    })
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});