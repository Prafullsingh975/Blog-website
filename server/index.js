require("dotenv").config();
const express = require("express");
const connectDb = require("./models/DB");
const userRouter = require('./routes/user.js');

const app = express();

connectDb();

app.use(express.json());

app.get('/',(req,res)=>{
  res.send("<h1>Backend @ Blog-website</h1>")
});

app.use("/user",userRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
