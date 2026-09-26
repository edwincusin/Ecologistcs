import { Router } from "express";
import {actualizarEntrega,crearEntrega,eliminarEntrega,obtenerEntregaPorId,obtenerEntregas} from '../controller/entregaController.js'


const routerEntrega=Router();

routerEntrega.post("/entrega/",crearEntrega);
routerEntrega.get("/entrega/",obtenerEntregas);
routerEntrega.get("/entrega/:id",obtenerEntregaPorId);
routerEntrega.put("/entrega/:id",actualizarEntrega);
routerEntrega.delete("/entrega/:id",eliminarEntrega);

export default routerEntrega;
