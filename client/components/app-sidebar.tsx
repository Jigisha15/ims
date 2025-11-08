import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, ListOrdered, LogOut, Package, PackagePlus, TableProperties } from "lucide-react"
import { Button } from "./ui/button"

export function AppSidebar() {

	const sidebarItems = [
		{
			title: "Home",
			url: "#",
			icon: Home,
		},
		{
			title: "Products",
			url: "/products",
			icon: Package,
		},
		{
			title: "Company",
			url: "/company",
			icon: Package,
		},
		{
			title: "Orders",
			url: "/orders",
			icon: ListOrdered
		},
		{
			title: "Purchase Orders",
			url: "#",
			icon: PackagePlus,
		},
		{
			title: "Quotations",
			url: "#",
			icon: TableProperties
		},


	]

	return (
		<Sidebar className="p-5 bg-gray-50 dark:bg-neutral-900">
			{/* Header */}
			<SidebarContent className="bg-gray-50 dark:bg-neutral-900">

				<SidebarMenu className="bg-gray-50 dark:bg-neutral-900">
					{/* App Title */}
					<div className="border-b pb-4 px-4 text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-wide">
						IMS
					</div>

					{/* Menu Items */}
					<div className="flex flex-col gap-2 mt-5">
						{sidebarItems.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild>
									<a
										href={item.url}
										className="flex items-center gap-3 px-4 py-5 rounded-md transition-all duration-200 text-gray-700 dark:text-gray-200 hover:bg-white hover:shadow-sm dark:hover:bg-neutral-800"
									>
										<item.icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
										<span className="text-lg font-medium">{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</div>
				</SidebarMenu>
			</SidebarContent>

			<SidebarFooter className="border-t bg-gray-50">
				<Button variant="ghost" className="text-lg font-medium px-4 py-5 rounded-md transition-all duration-200 text-gray-700 dark:text-gray-200 hover:bg-white hover:shadow-sm dark:hover:bg-neutral-800 cursor-pointer">Logout <LogOut /></Button>
			</SidebarFooter>
		</Sidebar>
	)
}