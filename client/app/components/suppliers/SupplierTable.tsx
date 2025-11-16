"use client"

import { useGetCompanies } from "@/api/company/company-mutation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CompanyFetchInterface, SupplierFetchInterface } from "@/types/interface"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, SquarePen, Trash } from "lucide-react"
import { SetStateAction, useState } from "react"
import { DataTable } from "../data-table/DataTable"
import { useGetSuppliers } from "@/api/suppliers/suppliers-mutation"
import AddSupplier from "./operations/AddSupplier"
import DeleteSupplier from "./operations/DeleteSupplier"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import EditSupplier from "./operations/EditSupplier"
import ViewSupplier from "./operations/ViewSupplier"

const SupplierTable = () => {

	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [selectedSupplier, setSelectedSupplier] = useState<SupplierFetchInterface | null>(null)

	const { data: supplierData, isLoading: supplierLoading, error: supplierError } = useGetSuppliers()
	const { data: companyData, isLoading: companyLoading, error: companyError } = useGetCompanies()

	if (companyLoading) return <div>Loading...</div> // TODO: Replace with Skeleton
	if (companyError) return <div>Something went wrong</div>

	const columns: ColumnDef<SupplierFetchInterface>[] = [
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
							setSelectedSupplier(row.original);
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
							setSelectedSupplier(row.original);
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
		}
	]

	return (
		<div className="">
			<AddSupplier />

			<div className="mr-5">
				<DataTable
					heading="Suppliers"
					columns={columns}
					data={supplierData?.data || []}
				/>
			</div>

			<DeleteSupplier
				openModal={openModal}
				setOpenModal={setOpenModal}
				selectedSupplier={selectedSupplier!}
			/>

			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5">
					<SheetHeader className="">
						<SheetTitle className="text-xl font-semibold mb-0">
							{isEditMode ? "Edit Customer" : "Customer Details"}
						</SheetTitle>
						<SheetDescription className="mt-0 font-semibold">
							{selectedSupplier
								? `${selectedSupplier.name}`
								: "No supplier selected"}
						</SheetDescription>
					</SheetHeader>

					<div className="">
						{selectedSupplier ? (
							isEditMode ? (
								<EditSupplier
									supplier={selectedSupplier}
									setOpenSheet={setOpenSheet}
								/>
							) : (
								<ViewSupplier
									supplier={selectedSupplier}
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

export default SupplierTable