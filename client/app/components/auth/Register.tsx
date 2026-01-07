"use client"

import { ChangeEvent, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RegisterInterface } from "@/types/interface"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { useRegister } from "@/api/auth/auth-mutation"
import toast from "react-hot-toast"
import InputField from "../common/InputField"

const Register = () => {
	const [userData, setUserData] = useState<RegisterInterface>({
		name: "",
		emailId: "",
		phoneNumber: "",
		password: "",
		role: ""
	})

	const router = useRouter()

	const { mutateAsync: registerMutation, isPending } = useRegister()
	const dispatch = useDispatch()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const resetForm = () => {
		setUserData({
			name: "",
			emailId: "",
			phoneNumber: "",
			password: "",
			role: ""
		})
	}

	const handleRegister = async () => {
		try {
			const response = await registerMutation(userData)

			toast.success(response.message || "User registered successfully!")
			router.push("/auth/login")

			resetForm()
		} catch (error: any) {
			console.error("Error while registering user : ", error)
			toast.error(error.response.data.message || "Error while registration")
		}
	}

	return (
		<div className="mx-auto my-20 w-100">
			<Card className="gap-2">
				<CardHeader>
					<CardTitle className="text-lg font-semibold">Register</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-2">
						<InputField
							label="Name"
							name="name"
							value={userData.name}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<InputField
							label="Email Id"
							name="emailId"
							value={userData.emailId}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<InputField
							label="Phone Number"
							name="phoneNumber"
							value={userData.phoneNumber}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<InputField
							label="Password"
							name="password"
							value={userData.password}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="">Role</label>
						<Input id="role" />
					</div>
					<div className="flex justify-center">
						<Button className="" onClick={handleRegister}>Register</Button>
					</div>
				</CardContent>
				<CardFooter className="mx-auto">
					<p className="">Already a user ? <Link href="/auth/login" className="text-blue-600">Login</Link></p>
				</CardFooter>
			</Card>

			{/*<Footer />*/}
		</div>
	)
}

export default Register