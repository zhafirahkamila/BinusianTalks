const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const authRoutes = require('./routes/auth');
const dataRoutes = require("./routes/data");
const userRoutes = require("./routes/user");
const uploadImage = express.static("uploads")

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // ganti sesuai port React
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

//Connect MongoDB Atlas
mongoose.connect(process.env.ATLAS_URI).then(() => console.log("MongoDB Connected")).catch(err => console.log(err))
app.use('/api/auth', authRoutes);
app.use("/api", dataRoutes);
app.use("/api/user", userRoutes)
app.use("/uploads", uploadImage);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const { MongoClient } = require("mongodb")
// require('dotenv').config();

// async function main() {
//   const Db = process.env.ATLAS_URI
//   const client = new MongoClient(Db)

//   try {
//     await client.connect()
//     const collections = await client.db("binusiandb").collections()
//     collections.forEach((collection) => console.log(collection.s.namespace.collection))
//   } catch (e) {
//     console.error(e)
//   } finally {
//     await client.close()
//   }
// }

// main()