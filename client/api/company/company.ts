import { CompanyFetchInterface, CompanyIntakeInterface } from "@/types/interface";
import axios from "axios";

export const getCompanies = async () => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company/get-all`)
	console.log("Response from backend:", response)
	return response.data
}

export const addCompany = async (companyData: CompanyIntakeInterface) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/company/create`, companyData);
	return response.data;
};

export const updateCompany = async (companyId: string, updateData: Partial<CompanyFetchInterface>) => {
	const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/company/update/${companyId}`, updateData);
	return response.data;
};

export const deleteCompany = async (companyId: string) => {
	const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/company/delete/${companyId}`);
	return response.data;
};
