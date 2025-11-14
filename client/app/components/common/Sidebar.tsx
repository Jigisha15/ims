"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Home, ListOrdered, LogOut, Package, PackagePlus, TableProperties } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function AppSidebar() {
	const [open, setOpen] = useState<boolean>(true);

	const sidebarItems = [
		{ title: "Home", url: "/", icon: Home },
		{ title: "Products", url: "/products", icon: Package },
		{ title: "Company", url: "/company", icon: Package },
		{ title: "Orders", url: "/orders", icon: ListOrdered },
		{ title: "Purchase Orders", url: "#", icon: PackagePlus },
		{ title: "Quotations", url: "#", icon: TableProperties },
	];

	return (
		<Card
			className={`
        rounded-none shadow-none border-0 h-screen p-1 relative
        transition-all duration-300 bg-white
        ${open ? "w-60" : "w-fit"}
      `}
		>
			{/* Title */}
			<CardTitle className="text-center border-b py-5">
				IMS
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
			<CardContent className="flex flex-col gap-2 mt-5 px-2 overflow-y-auto">
				{sidebarItems.map((item) => (
					<Link
						key={item.title}
						href={item.url}
						className="flex items-start justify-start gap-3 border border-white px-4 py-3 rounded-md hover:bg-gray-100"
					>
						<item.icon className={`w-6 h-6 text-gray-600 ${open ? "" : "mx-auto"}`} />
						{open && <span className="text-base">{item.title}</span>}
					</Link>
				))}
			</CardContent>

			{/* Footer */}
			<CardFooter className="border-t">
				{open ? (
					<Button
						variant="ghost"
						className="w-full flex justify-between px-4 py-5"
					>
						Logout <LogOut />
					</Button>
				) : (
					<Button
						variant="ghost"
						className="w-full flex justify-center px-4 py-3"
					>
						<LogOut className="w-6 h-6" />
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}
