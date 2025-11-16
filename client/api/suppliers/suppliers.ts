import { CustomerIntakeInterface, SupplierIntakeInterface } from "@/types/interface"
import axios from "axios"

export const getSuppliers = async () => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/supplier/get-all`)
	return response.data
}

export const getOneSupplier = async (supplierId: string) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/supplier/get-one/${supplierId}`)
	return response.data
}

export const createSupplier = async (supplierData: SupplierIntakeInterface) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/supplier/create`, supplierData)
	return response.data
}

export const updateSupplier = async (supplierId: string, updateData: Partial<SupplierIntakeInterface>) => {
	const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/supplier/update/${supplierId}`, updateData)
	return response.data
}


export const deleteSupplier = async (supplierId: string) => {
	const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/supplier/delete/${supplierId}`)
	return response.data
}