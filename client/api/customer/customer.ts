import { CustomerIntakeInterface } from "@/types/interface"
import axios from "axios"

export const getCustomers = async () => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customer/get-all`)
	return response.data
}

export const getOneCustomer = async (customerId: string) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customer/get-one/${customerId}`)
	return response.data
}

export const getCompanyCustomer = async (companyId: string) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customer/get-company-customer/${companyId}`)
	return response.data
}

export const createCustomer = async (customerData: CustomerIntakeInterface) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/customer/create`, customerData)
	return response.data
}

export const updateCustomer = async (customerId: string, updateData: Partial<CustomerIntakeInterface>) => {
	const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/customer/update/${customerId}`, updateData)
	return response.data
}


export const deleteCustomer = async (customerId: string) => {
	const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/customer/delete/${customerId}`)
	return response.data
}