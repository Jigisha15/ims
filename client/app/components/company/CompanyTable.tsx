"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CompanyFetchInterface } from "@/types/interface"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, SquarePen, Trash } from "lucide-react"
import { SetStateAction, useState } from "react"
import { DataTable } from "../data-table/DataTable"
import AddCompany from "./operations/AddCompany"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import EditCompany from "./operations/EditCompany"
import ViewCompany from "./operations/ViewCompany"
import { useGetCompanies } from "@/api/company/company-mutation"
import DeleteCompany from "./operations/DeleteCompany"

const CompanyTable = () => {
	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [selectedCompany, setSelectedCompany] = useState<CompanyFetchInterface | null>(null)

	const { data, isLoading, error } = useGetCompanies()

	if (isLoading) return <div>Loading...</div> // TODO: Replace with Skeleton
	if (error) return <div>Something went wrong</div>

	const columns: ColumnDef<CompanyFetchInterface>[] = [
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
				<div className="flex gap-0">
					<Button
						variant="ghost"
						className="p-0 m-0 hover:bg-inherit"
						onClick={() => {
							setIsEditMode(false)
							setSelectedCompany(row.original)
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
					<Button
						variant="ghost"
						className="p-0 hover:bg-inherit"
						onClick={() => {
							setSelectedCompany(row.original)
							setOpenModal(true)
						}}
					>
						<Trash className="w-5 h-5" />
					</Button>
				</div>
			)
		},
		{ accessorKey: "name", header: "Name" },
		{ accessorKey: "emailId", header: "Email Id" },
		{ accessorKey: "phoneNumber", header: "Phone Number" },
		{ accessorKey: "address", header: "Address" },
		{ accessorKey: "gstin", header: "Gstin" }
	]

	return (
		<div>
			<AddCompany />

			<div className="mr-5">
				<DataTable
					heading="Companies"
					columns={columns}
					data={data.data}
				/>
			</div>

			<DeleteCompany
				openModal={openModal}
				setOpenModal={setOpenModal}
				selectedCompany={selectedCompany!}
			/>

			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5">
					<SheetHeader>
						<SheetTitle className="text-xl font-semibold mb-0">
							{isEditMode ? "Edit Company" : "Company Details"}
						</SheetTitle>
						<SheetDescription className="mt-0 font-semibold">
							{selectedCompany
								? `${selectedCompany.name}`
								: "No company selected"}
						</SheetDescription>
					</SheetHeader>

					<div>
						{selectedCompany ? (
							isEditMode ? (
								<EditCompany company={selectedCompany} setOpenSheet={setOpenSheet}
								/>
							) : (
								<ViewCompany company={selectedCompany} />
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