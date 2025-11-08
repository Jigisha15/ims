import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "../footer/Footer"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Register = () => {
	return (
		<div className="mx-auto my-20 w-100">
			<Card className="gap-2">
				<CardHeader>
					<CardTitle className="text-lg font-semibold">Register</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-2">
						<label htmlFor="">Name</label>
						<Input id="name" />
					</div>
					<div className="mb-3">
						<label htmlFor="">Email Id</label>
						<Input id="email_id" />
					</div>
					<div className="mb-3">
						<label htmlFor="">Phone Number</label>
						<Input id="phone_number" />
					</div>
					<div className="mb-3">
						<label htmlFor="">Password</label>
						<Input id="password" />
					</div>
					<div className="mb-3">
						<label htmlFor="">Role</label>
						<Input id="role" />
					</div>
					<div className="flex justify-center">
						<Button className="">Register</Button>
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