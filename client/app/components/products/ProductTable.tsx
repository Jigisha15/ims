"use client"

import { Product } from "@/types/interface"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../data-table/DataTable"
import { dummyProductData } from "@/types/dummyfile"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Eye, SquarePen } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const ProductTable = () => {

	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [openDialog, setOpenDialog] = useState<boolean>(false)

	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

	const columns: ColumnDef<Product>[] = [
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
						onClick={() => alert(`Viewing ${row.original.name}`)}
					>
						<Eye className="w-5 h-5" />
					</Button>
					<Button
						variant="ghost"
						className="p-0 hover:bg-inherit"
						onClick={() => {
							setSelectedProduct(row.original)
							setOpenSheet(true)
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
			accessorKey: "modelNumber",
			header: "Model Number",
		},
		{
			accessorKey: "costPrice",
			header: "Cost Price",
		},
		{
			accessorKey: "sellingPrice",
			header: "Selling Price",
		},
		{
			accessorKey: "stockQuantity",
			header: "Quantity",
		},
		{
			accessorKey: "description",
			header: "Description"
		}
	]
	return (
		<div className="">

			<div className="mr-5">
				<DataTable
					heading="Products"
					columns={columns}
					data={dummyProductData}
				/>
			</div>

			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5">
					<SheetHeader>
						<SheetTitle>Edit Product</SheetTitle>
						<SheetDescription>
							{selectedProduct
								? `Editing ${selectedProduct.name} (${selectedProduct.modelNumber})`
								: "No product selected"}
						</SheetDescription>
					</SheetHeader>

					<div className="mt-6 space-y-4">
						{selectedProduct ? (
							<>
								<div className="flex flex-col gap-2">
									<label className="text-sm font-medium">Name</label>
									<input
										type="text"
										defaultValue={selectedProduct.name}
										className="border rounded-md px-2 py-1"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label className="text-sm font-medium">Selling Price</label>
									<input
										type="number"
										defaultValue={selectedProduct.sellingPrice}
										className="border rounded-md px-2 py-1"
									/>
								</div>
								<Button className="w-full bg-green-700 hover:bg-green-800">
									Save Changes
								</Button>
							</>
						) : (
							<p className="text-gray-500">Select a product to edit.</p>
						)}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default ProductTable