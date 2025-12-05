import {Router} from 'express';
import * as productController from '../controllers/productconstoller.js';

const router = Router;

router.post('/products', productController.create);

export default router;