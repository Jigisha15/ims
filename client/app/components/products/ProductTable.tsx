"use client"

import { ProductFetchInterface, ProductIntakeInterface, ProductInterface } from "@/types/interface"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../data-table/DataTable"
import { dummyProductData } from "@/types/dummyfile"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Eye, Plus, SquarePen, Trash } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import AddProduct from "./operations/AddProduct"
import ViewProduct from "./operations/ViewProduct"
import EditProduct from "./operations/EditProduct"
import { useGetProducts } from "@/api/products/products-mutation"
import DeleteProduct from "./operations/DeleteProduct"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProductTableProps {
	data: ProductInterface[];
}

const ProductTable = ({ data }: ProductTableProps) => {
	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(null)
	//const [selectedProduct, setSelectedProduct] = useState<ProductFetchInterface | null>(null)

	const columns: ColumnDef<ProductInterface>[] = [
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
							setSelectedProduct(row.original)
							setIsEditMode(false)
							setOpenSheet(true)
						}}
						title="View"
					>
						<Eye className="w-5 h-5 m-0 p-0" />
					</Button>
					<Button
						variant="ghost"
						className="p-0 hover:bg-inherit w-1"
						onClick={() => {
							setSelectedProduct(row.original)
							setOpenSheet(true)
							setIsEditMode(true)
						}}
						title="Edit"
					>
						<SquarePen className="w-5 h-5 m-0 p-0" />
					</Button>
					<Button
						variant="ghost"
						className="p-0 hover:bg-inherit w-1"
						onClick={() => {
							setSelectedProduct(row.original)
							setOpenModal(true)
						}}
						title="Delete"
					>
						<Trash className="w-5 h-5 m-0 p-0" />
					</Button>
				</div>
			)
		},
		{
			accessorKey: "name",
			header: "Name",
			cell: ({ row }) => (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className="cursor-pointer">
							{row.original.name}
						</TooltipTrigger>
						<TooltipContent className="max-w-xs">
							<p>{row.original.description}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			),
		},
		{
			//accessorKey: "Category",
			header: "Category",
			cell: ({ row }) => (
				<div className="">{row.original.category.name}</div>
			)
		},
		{
			accessorKey: "modelNumber",
			header: "Model Number",
		},
		{
			accessorKey: "costPrice",
			header: "Cost Price",
			cell: ({ row }) => (
				<div className="">₹ {row.original.costPrice}</div>
			)
		},
		{
			accessorKey: "sellingPrice",
			header: "Selling Price",
			cell: ({ row }) => (
				<div className="">₹ {row.original.sellingPrice}</div>
			)
		},
		{
			accessorKey: "company",
			header: "Company",
			cell: ({ row }) => (
				<div className="">{row.original.company.name}</div>
			)
		},
		{
			accessorKey: "stockQuantity",
			header: "Qty",
		},
	]

	return (
		<div className="">
			<AddProduct />

			<div className="mr-5">
				<DataTable
					heading="Products"
					columns={columns}
					data={data}
				/>
			</div>

			<DeleteProduct
				openModal={openModal}
				setOpenModal={setOpenModal}
				selectedProduct={selectedProduct!}
			/>

			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5">
					<SheetHeader className="">
						<SheetTitle className="text-xl font-semibold mb-0">
							{isEditMode ? "Edit Product" : "Product Details"}
						</SheetTitle>
						<SheetDescription className="mt-0 font-semibold">
							{selectedProduct
								? `${selectedProduct.name} (${selectedProduct.modelNumber})`
								: "No product selected"}
						</SheetDescription>
					</SheetHeader>

					<div className="">
						{selectedProduct ? (
							isEditMode ? (
								<EditProduct
									product={selectedProduct}
									setOpenSheet={setOpenSheet}
								/>
							) : (
								<ViewProduct
									product={selectedProduct}
								/>
							)
						) : (
							<p className="text-gray-500">Select a product to view.</p>
						)}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default ProductTable