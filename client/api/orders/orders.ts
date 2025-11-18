import axios from "axios"

export const getOrders = async () => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/get-all`)
	return response.data
}

export const getOneOrder = async (orderId: string) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/get-one/${orderId}`)
	return response.data
}

export const createOrder = async (orderData: any) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/create`, orderData)
	return response.data
}

export const updateOrder = async (orderId: string, updateData: any) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/update/${orderId}`, updateData)
	return response.data
}

export const deleteOrder = async (orderId: string) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/delete/${orderId}`)
}