require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);

app.post('/register', async (req, res) => {
    try {
        const { fullname, email, phone, password } = req.body;

        await client.connect();
        const db = client.db("registrationDB");
        const collection = db.collection("users");

        await collection.insertOne({
            fullname,
            email,
            phone,
            password,
            createdAt: new Date()
        });

        res.json({ success: true, message: "User registered successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
