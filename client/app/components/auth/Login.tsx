"use client"

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "../common/Footer"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChangeEvent, useEffect, useState } from "react"
import { LoginInterface } from "@/types/interface"
import { useLogin } from "@/api/auth/auth-mutation"
import toast from "react-hot-toast"
import InputField from "../common/InputField"
import { useRouter } from "next/navigation"
import { loginSuccess } from "@/app/store/authSlice"
import { useDispatch, useSelector } from "react-redux"

const Login = () => {
	const [userData, setUserData] = useState<LoginInterface>({
		emailId: "",
		password: ""
	})

	const router = useRouter()

	const { mutateAsync: loginMutation, isPending } = useLogin()
	const dispatch = useDispatch()


	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const resetForm = () => {
		setUserData({
			emailId: "",
			password: ""
		})
	}

	const handleLogin = async () => {
		try {
			const response = await loginMutation(userData)

			dispatch(loginSuccess(response.token));
			localStorage.setItem("token", response.token)

			toast.success(response.message || "User logged in successfully!")
			router.push("/category")

			resetForm()
		} catch (error: any) {
			console.error("Error while logging in: ", error)
			toast.error(error.response.data.message || "Error while loggin in")
		}
	}

	return (
		<div className="mx-auto my-40 w-100">
			<Card>
				<CardHeader>
					<CardTitle className="text-lg font-semibold">Login</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4">
						<InputField
							label="Email Id"
							name="emailId"
							value={userData.emailId}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-2">
						<InputField
							label="Password"
							name="password"
							value={userData.password}
							onChange={handleChange}
						/>
					</div>
					<div className="flex justify-center">
						<Button onClick={handleLogin}>Login</Button>
					</div>
				</CardContent>
				<CardFooter className="mx-auto">
					<p>
						Not a user?{" "}
						<Link href="/auth/register" className="text-blue-600">
							Register
						</Link>
					</p>
				</CardFooter>

			</Card>
			{/*<Footer />*/}
		</div >
	)
}

export default Login