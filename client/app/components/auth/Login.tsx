import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "../common/Footer"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Login = () => {
	return (
		<div className="mx-auto my-40 w-100">
			<Card>
				<CardHeader>
					<CardTitle className="text-lg font-semibold">Login</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-2">
						<label htmlFor="">Email Id</label>
						<Input id="email_id" />
					</div>
					<div className="mb-2">
						<label htmlFor="">Password</label>
						<Input id="password" />
					</div>
					<div className="flex justify-center">
						<Button>Login</Button>
					</div>
				</CardContent>
				<CardFooter className="mx-auto">
					<CardFooter className="mx-auto">
						<p className="">Not a user ? <Link href="/auth/register" className="text-blue-600">Register</Link></p>
					</CardFooter>
				</CardFooter>
			</Card>
			{/*<Footer />*/}
		</div >
	)
}

export default Login