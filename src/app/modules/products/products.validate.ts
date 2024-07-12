import { z } from 'zod'

const createProductValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Product Name is required' }),
  description: z
    .string()
    .nonempty({ message: 'Product Description is required' }),
  price: z
    .number()
    .positive({ message: 'Product Price must be a positive number' }),
  stockQuantity: z
    .number()
    .int()
    .positive({ message: 'Stock Quantity must be a positive integer' }),
  category: z.string().nonempty({ message: 'Product Category is required' }),
  brand: z.string().nonempty({ message: 'Product Brand is required' }),
  rating: z.number().min(0).max(5).optional().default(0),
  image: z
    .string()
    .url({ message: 'Product Image must be a valid URL' })
    .optional(),
})

const updateProductValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Product Name is required' }).optional(),
  description: z
    .string()
    .nonempty({ message: 'Product Description is required' })
    .optional(),
  price: z
    .number()
    .positive({ message: 'Product Price must be a positive number' })
    .optional(),
  stockQuantity: z
    .number()
    .int()
    .positive({ message: 'Stock Quantity must be a positive integer' })
    .optional(),
  category: z
    .string()
    .nonempty({ message: 'Product Category is required' })
    .optional(),
  brand: z
    .string()
    .nonempty({ message: 'Product Brand is required' })
    .optional(),
  rating: z.number().min(0).max(5).optional(),
  image: z
    .string()
    .url({ message: 'Product Image must be a valid URL' })
    .optional(),
})

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
}
