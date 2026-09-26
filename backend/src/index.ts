import express from "express";
import routerEntrega from "./routes/entregaRoute.js";

const app=express();

const PUERTO=3000;

app.use(express.json({limit:'10mb'}));
app.use("/inventario",routerEntrega)

app.listen(PUERTO,()=>{
    console.log("servidor corriendo en el puerto : "+PUERTO)
})