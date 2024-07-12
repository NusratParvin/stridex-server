import { Product } from './products.model'
import { TProduct } from './products.interface'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload)
  return result
}

const getAllProductsFromDB = async () => {
  const result = await Product.find({})
  return result
}

const getProductByIdFromDB = async (productId: string) => {
  const product = await Product.findById(productId)

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }

  return product
}

const updateProductIntoDB = async (
  productId: string,
  updateData: Partial<TProduct>,
) => {
  const isProductExists = await Product.findById(productId)

  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!updatedProduct) {
    throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Update Failed')
  }

  return updatedProduct
}

const deleteProductFromDB = async (productId: string) => {
  const isProductExists = await Product.findById(productId)

  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }

  const deletedProduct = await Product.findByIdAndDelete(productId)

  if (!deletedProduct) {
    throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Delete Failed')
  }

  return deletedProduct
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
}
