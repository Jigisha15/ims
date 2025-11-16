"use client"

import { useGetCompanies } from "@/api/company/company-mutation"
import { useGetCustomers } from "@/api/customer/customer-mutation"
import { Button } from "@/components/ui/button"
import { CompanyFetchInterface, CustomerFetchInterface } from "@/types/interface"
import { Checkbox } from "@radix-ui/react-checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, SquarePen, Trash } from "lucide-react"
import { SetStateAction, useState } from "react"
import { DataTable } from "../data-table/DataTable"
import AddCustomer from "./operations/AddCustomer"
import DeleteCustomer from "./operations/DeleteCustomer"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import EditCustomer from "./operations/EditCustomer"
import ViewCustomer from "./operations/ViewCustomer"


const CustomerTable = () => {

	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [selectedCustomer, setSelectedCustomer] = useState<CustomerFetchInterface | null>(null)

	const { data: customerData, isLoading: customerLoading, error: customerError } = useGetCustomers()
	const { data: companyData, isLoading: companyLoading, error: companyError } = useGetCompanies()

	if (customerLoading) return <div>Loading...</div> // TODO: Replace with Skeleton
	if (customerError) return <div>Something went wrong</div>


	const columns: ColumnDef<CustomerFetchInterface>[] = [
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
				<div className="flex gap-1">
					<Button
						variant="ghost"
						className="p-0 m-0 hover:bg-inherit w-1"
						onClick={() => {
							setIsEditMode(false);
							setOpenSheet(true);
						}}
						title="View"
					>
						<Eye className="w-5 h-5" />
					</Button>

					<Button
						variant="ghost"
						className="p-0 hover:bg-inherit w-1"
						onClick={() => {
							setSelectedCustomer(row.original);
							setOpenSheet(true);
							setIsEditMode(true);
						}}
						title="Edit"
					>
						<SquarePen className="w-5 h-5" />
					</Button>

					<Button
						variant="ghost"
						className="p-0 hover:bg-inherit w-1"
						onClick={() => {
							setSelectedCustomer(row.original);
							setOpenModal(true);
						}}
						title="Delete"
					>
						<Trash className="w-5 h-5" />
					</Button>
				</div>
			)
		},
		{ accessorKey: "name", header: "Name" },
		{ accessorKey: "emailId", header: "Email Id" },
		{ accessorKey: "phoneNumber", header: "Phone Number" },
		{
			accessorKey: "companyId",
			header: "Company",
			cell: ({ row }) => {
				// Safely handle if companyData isn't loaded yet
				if (!companyData?.data) return <div>Loading...</div>;

				const company = companyData.data.find(
					(cmp: CompanyFetchInterface) => cmp.id === row.original.companyId
				);

				return <div>{company?.name ?? "Unknown"}</div>;
			},
		},
	];

	return (
		<div className="">
			<AddCustomer />

			<div className="mr-5">
				<DataTable
					heading="Customers"
					columns={columns}
					data={customerData?.data || []}
				/>
			</div>

			<DeleteCustomer
				openModal={openModal}
				setOpenModal={setOpenModal}
				selectedCustomer={selectedCustomer!}
			/>

			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5">
					<SheetHeader className="">
						<SheetTitle className="text-xl font-semibold mb-0">
							{isEditMode ? "Edit Customer" : "Customer Details"}
						</SheetTitle>
						<SheetDescription className="mt-0 font-semibold">
							{selectedCustomer
								? `${selectedCustomer.name}`
								: "No customer selected"}
						</SheetDescription>
					</SheetHeader>

					<div className="">
						{selectedCustomer ? (
							isEditMode ? (
								<EditCustomer
									customer={selectedCustomer}
									setOpenSheet={setOpenSheet}
								/>
							) : (
								<ViewCustomer
									customer={selectedCustomer}
								/>
							)
						) : (
							<p className="text-gray-500">Select a customer to view.</p>
						)}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default CustomerTable