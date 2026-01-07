import { LoginInterface, RegisterInterface } from "@/types/interface";
import axios from "axios"

export const register = async (registerData: RegisterInterface) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, registerData)
	return response.data;
}

export const login = async (loginData: LoginInterface) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, loginData);
	return response.data;
}