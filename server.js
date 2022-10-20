import express from "express";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {engine as hbengine} from "express-handlebars";
import getHelpers from "./helpers/handlebars.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT;
const app = express();

import expressSession from "express-session";
import cookieParser from "cookie-parser";
import connectFlash from "connect-flash"

import {default as UsersRouter} from "./routes/users.router.js";
import {default as PrestatairesRouter} from "./routes/prestataires.router.js";
import {default as OrganisateursRouter} from "./routes/organisateurs.router.js";

app.engine("handlebars", hbengine({
    defaultLayout: 'main',
    extname: '.handlebars',
    helpers: getHelpers
}));
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

app.use(cookieParser("secret_password"));
const unJour = 1000 * 60 * 6 * 24; //millisecondes
app.use(
    expressSession({
        secret:"secret_password",
        cookie:{
            maxAge: unJour
        },
        resave: false,
        saveUninitialized: false
    })
);
app.use(connectFlash());
app.use((req,res,next)=>{
    res.locals.flashMessages = req.flash();
    next();
});

app.use("/users", UsersRouter);
app.use("/prestataires", PrestatairesRouter);
app.use("/organisateurs", OrganisateursRouter);
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



