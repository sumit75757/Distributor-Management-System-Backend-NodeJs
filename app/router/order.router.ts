import express from 'express';
import { runAsyncWrapper } from '../helpers/helper';
import * as OrderController from '../controller/order.controller';

let router = express.Router();

router.get("/getOrders", runAsyncWrapper(OrderController.getOrders));
router.get("/getSalesmenOrders", runAsyncWrapper(OrderController.getSalesmenOrders));
router.get("/getOrderById", runAsyncWrapper(OrderController.getOrderById));
router.post("/insertOrder", runAsyncWrapper(OrderController.insertOrder));
router.put("/updateOrders", runAsyncWrapper(OrderController.updateOrders));
router.delete("/deleteOrder", runAsyncWrapper(OrderController.deleteOrder));

export default router;