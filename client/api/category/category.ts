import { CategoryFetchInterface, CategoryIntakeInterface } from "@/types/interface"
import axios from "axios"

export const getCategories = async () => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/get-all`)
	return response.data
}

export const getOneCategory = async (categoryId: string) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company/:${categoryId}`)
	return response.data
}

export const addCategory = async (categoryData: any) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category/create`, categoryData);
	return response.data;
};

export const updateCategory = async (categoryId: string, updateData: Partial<CategoryFetchInterface>) => {
	const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/category/update/${categoryId}`, updateData);
	return response.data;
};

export const deleteCategory = async (categoryId: string) => {
	const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/delete/${categoryId}`);
	return response.data;
};
