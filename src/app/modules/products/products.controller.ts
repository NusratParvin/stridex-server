import { catchAsync } from '../../utils/catchAsync'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import sendResponse from '../../utils/sendResponse'
import { ProductServices } from './products.service'

const createProduct = catchAsync(async (req, res) => {
  const product = await ProductServices.createProductIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: product,
  })
})

const getAllProducts = catchAsync(async (req, res) => {
  const products = await ProductServices.getAllProductsFromDB()
  if (products.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: products,
    })
    return
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: products,
  })
})

const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params
  const product = await ProductServices.getProductByIdFromDB(id)
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: product,
  })
})

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const product = await ProductServices.updateProductIntoDB(id, req.body)
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: product,
  })
})

const updateProductStock = catchAsync(async (req, res) => {
  const { id } = req.params
  const product = await ProductServices.updateProductStockIntoDB(id, req.body)
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product stock updated successfully',
    data: product,
  })
})

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const deletedProduct = await ProductServices.deleteProductFromDB(id)
  if (!deletedProduct) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: deletedProduct,
  })
})

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  updateProductStock,
  deleteProduct,
}
