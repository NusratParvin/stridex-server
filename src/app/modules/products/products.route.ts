import express from 'express'
import { ProductControllers } from './products.controller'
import zodValidationRequest from '../../middlewares/zodValidationRequest'
import { ProductValidation } from './products.validate'

const router = express.Router()

router.post(
  '/',
  zodValidationRequest(ProductValidation.createProductValidationSchema),
  ProductControllers.createProduct,
)
router.get('/', ProductControllers.getAllProducts)

router.get('/:id', ProductControllers.getProductById)

router.put(
  '/:id',
  zodValidationRequest(ProductValidation.updateProductValidationSchema),
  ProductControllers.updateProduct,
)
router.delete('/:id', ProductControllers.deleteProduct)

export const productRoutes = router
