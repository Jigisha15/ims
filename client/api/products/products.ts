import { ProductIntakeInterface } from "@/types/interface"
import axios from "axios"

export const getProducts = async () => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`)
	return response.data
}

export const getCategoryWiseProducts = async (category: string) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/category-wise/${category}`)
	return response.data
}

export const getOneProduct = async (productId: string) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`)
	return response.data
}

export const addProduct = async (productData: ProductIntakeInterface) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/create`, productData)
	return response.data
}

export const updateProduct = async (productId: string, updateData: Partial<ProductIntakeInterface>) => {
	const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/product/update/${productId}`, updateData)
	return response.data
}

export const deleteProduct = async (productId: string) => {
	const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/delete/${productId}`)
	return response.data
}