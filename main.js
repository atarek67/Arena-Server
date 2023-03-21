/**
 * 1-npm i express
 * 2-npm i body-parser
 * 3-npm i path
 */
// if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
// }

const stripe = require("stripe")
const express = require("express");
// const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 7500
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const bodyParser = require("body-parser");
const path = require("path");
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
// console.log(stripePublicKey)
// console.log(stripeSecretKey)
// image variable

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use((req, res, next) => {
    // Attach CORS headers
    // Required when using a detached backend (that runs on a different domain)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
// app.use(helmet())

//#region For images
app.use('/api/images' , express.static(path.join(__dirname ,'./images' )));
//#endregion

//#region For courses [CRUD] [Creat-Read-Update-Delete]
const CourseRoutes = require("./Routes/CourseRoutes");
app.use("/api/courses",CourseRoutes);
//#endregion

//#region For courses [CRUD] [Creat-Read-Update-Delete]
const AdminRoutes = require("./Routes/AdminRoutes");
app.use("/api/admin",AdminRoutes);
//#endregion

//#region For users 
const userRoutes = require("./Routes/UserRoutes");
app.use("/api/users",userRoutes);
//#endregion

//#region For players 
const playerRoutes = require("./Routes/PlayerRoutes");
app.use("/api/players",playerRoutes);
//#endregion

//#region For fieldOwners 
const fieldOwnerRoutes = require("./Routes/FieldOwnerRoutes");
app.use("/api/fieldOwners",fieldOwnerRoutes);
//#endregion

//#region For fields 
const fieldRoutes = require("./Routes/FieldRoutes");
app.use("/api/fields",fieldRoutes);
//#endregion

//#region For games 
const gameRoutes = require("./Routes/GameRoutes");
app.use("/api/games",gameRoutes);
//#endregion

// payment region
const paymentRoutes = require("./Routes/PaymentRoutes");
app.use("/api/payment", paymentRoutes);
// payment end




app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)})

