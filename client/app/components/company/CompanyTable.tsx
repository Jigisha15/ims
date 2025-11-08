"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Company } from "@/types/interface"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, SquarePen } from "lucide-react"
import { useState } from "react"
import { DataTable } from "../data-table/DataTable"
import { dummyCompanyData } from "@/types/dummyfile"
import AddCompany from "./operations/AddCompany"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import EditCompany from "./operations/EditCompany"
import ViewCompany from "./operations/ViewCompany"

const CompanyTable = () => {
	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

	const columns: ColumnDef<Company>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
					className="cursor-pointer data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value: any) => row.toggleSelected(!!value)}
					aria-label="Select row"
					className="cursor-pointer data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "action",
			header: "Actions",
			cell: ({ row }) => (
				<div className="flex">
					<Button
						variant="ghost"
						className="p-0 m-0 hover:bg-inherit"
						onClick={() => {
							setIsEditMode(false)
							setOpenSheet(true)
						}}
					>
						<Eye className="w-5 h-5" />
					</Button>
					<Button
						variant="ghost"
						className="p-0 hover:bg-inherit"
						onClick={() => {
							setSelectedCompany(row.original)
							setOpenSheet(true)
							setIsEditMode(true)
						}}
					>
						<SquarePen className="w-5 h-5" />
					</Button>
				</div>
			)
		},
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorKey: "emailId",
			header: "Email Id",
		},
		{
			accessorKey: "phoneNumber",
			header: "Phone Number",
		},
		{
			accessorKey: "address",
			header: "Address",
		},
		{
			accessorKey: "gstin",
			header: "Gstin",
		}
	]

	return (
		<div className="">
			<AddCompany />

			<div className="mr-5">
				<DataTable
					heading="Companies"
					columns={columns}
					data={dummyCompanyData}
				/>
			</div>

			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5">
					<SheetHeader className="">
						<SheetTitle className="text-xl font-semibold mb-0">
							{isEditMode ? "Edit Product" : "Product Details"}
						</SheetTitle>
						<SheetDescription className="mt-0 font-semibold">
							{selectedCompany
								? `${selectedCompany.name}`
								: "No company selected"}
						</SheetDescription>
					</SheetHeader>

					<div className="">
						{selectedCompany ? (
							isEditMode ? (
								<EditCompany
									company={selectedCompany}
								/>
							) : (
								<ViewCompany
									company={selectedCompany}
								/>
							)
						) : (
							<p className="text-gray-500">Select a company to view.</p>
						)}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default CompanyTable