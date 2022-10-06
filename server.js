import express from "express";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {engine} from "express-handlebars";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT;
const app = express();


import {default as AdminRouter} from "./routes/admin.router.js";


app.engine("handlebars",engine());
app.set("view engine","handlebars");
app.set("views","./views");

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "Bel'funfair project",
            description: "API documentation",
            contact: {
                name: "SAE",
            },
            servers: ["http://localhost:3000/"],
        },
    }),
    apis: ["server.js", "./routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOption);

app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/", AdminRouter);
app.get("/",(req,res)=>{
    res.render("layouts/home.handlebars")
});

/*app.use("*",(req,res,next)=>{
    const err = new Error("Not found");
    err.status = 404
    next(err)
});
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.render("error404.handlebars")
});
*/

app.listen(port, ()=>{
    console.log("Le serveur écoute sur port "+port)
});



