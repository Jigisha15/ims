"use client"

import { logout } from "@/app/store/authSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Home, ListOrdered, LogOut, Package, PackagePlus, TableProperties, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

export function AppSidebar() {
	const [open, setOpen] = useState<boolean>(true);

	const router = useRouter()
	const dispatch = useDispatch()

	const sidebarItems = [
		//{ title: "Home", url: "/", icon: Home },
		{ title: "Category", url: "/category", icon: TableProperties },
		{ title: "Products", url: "/products", icon: Package },
		{ title: "Companies", url: "/company", icon: Package },
		{ title: "Customers", url: "/customers", icon: Users },
		{ title: "Suppliers", url: "/suppliers", icon: Users },
		{ title: "Orders", url: "/orders", icon: ListOrdered },
		{ title: "Purchase Orders", url: "#", icon: PackagePlus },
		{ title: "Quotations", url: "#", icon: TableProperties },
		{ title: "Reports", url: "#", icon: TableProperties },
	];

	const handleLogout = () => {
		try {
			const token = localStorage.getItem("token")
			// remove from the localStorage
			localStorage.removeItem("token")
			// remove from the redux
			dispatch(logout())
			//toast
			toast.success("Logged out successfully")
			// page reload
			router.push("/auth/register")

		} catch (error: any) {
			console.error("Error while logging out : ", error)
			toast.error("Error while logging out")
		}
	}

	return (
		<Card
			className={` ounded-none shadow-none border-0 h-screen p-1 relative transition-all duration-300 bg-white flex flex-col ${open ? "w-60" : "w-fit"}`}
		>
			{/* Title */}
			<CardTitle className="text-center text-wrap border-b py-5 md:px-1">
				{open ? "Inventory Management System" : "IMS"}
			</CardTitle>

			{/* Toggle Button */}
			<div className="absolute top-10 -right-5">
				<Button
					onClick={() => setOpen(!open)}
					className="bg-white border rounded-full p-2 hover:bg-gray-200"
				>
					{open ? (
						<ChevronLeft className="w-6 h-6 text-black" />
					) : (
						<ChevronRight className="w-6 h-6 text-black" />
					)}
				</Button>
			</div>

			{/* Sidebar Items */}
			<CardContent className="flex flex-col gap-2 mt-0 px-2 overflow-y-auto">
				{sidebarItems.map((item) => (
					<Link
						key={item.title}
						href={item.url}
						className="flex items-center justify-start gap-3 border border-white px-4 py-2 rounded-md hover:bg-gray-100"
						title={`${item.title}`}
					>
						<item.icon className={`w-5 h-5 text-gray-600 ${open ? "" : "mx-auto"}`} />
						{open && <span className="text-base">{item.title}</span>}
					</Link>
				))}
			</CardContent>

			{/* Footer */}
			<CardFooter className="border-t mt-auto w-full px-2">
				{open ? (
					<Button
						variant="ghost"
						className="text-base w-full flex justify-between px-4 py-6 mb-5 hover:bg-red-100"
						onClick={handleLogout}
					>
						Logout <LogOut />
					</Button>
				) : (
					<Button
						variant="ghost"
						className="w-full flex justify-center px-4 py-3"
						onClick={handleLogout}
					>
						<LogOut className="w-6 h-6" />
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}
