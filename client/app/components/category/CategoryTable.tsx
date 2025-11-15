"use client"

import { useGetCategories } from "@/api/category/category-mutation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CategoryFetchInterface } from "@/types/interface"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, SquarePen, Trash } from "lucide-react"
import { SetStateAction, useState } from "react"
import { DataTable } from "../data-table/DataTable"
import AddCategory from "./operations/AddCategory"
import DeleteCategory from "./operations/DeleteCategory"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import EditCategory from "./operations/EditCategory"
import ViewCategory from "./operations/ViewCategory"

const CategoryTable = () => {
	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [selectedCategory, setSelectedCategory] = useState<CategoryFetchInterface | null>(null)

	const { data, isLoading, error } = useGetCategories()

	if (isLoading) return <div>Loading...</div> // TODO: Replace with Skeleton
	if (error) return <div>Something went wrong</div>

	const columns: ColumnDef<CategoryFetchInterface>[] = [
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
							setSelectedCategory(row.original)
							setOpenSheet(true)
						}}
					>
						<Eye className="w-5 h-5" />
					</Button>
					<Button
						variant="ghost"
						className="p-0 hover:bg-inherit"
						onClick={() => {
							setSelectedCategory(row.original)
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
							setSelectedCategory(row.original)
							setOpenModal(true)
						}}
					>
						<Trash className="w-5 h-5" />
					</Button>
				</div>
			)
		},
		{ accessorKey: "name", header: "Name" },
		{
			accessorKey: "products",
			header: "Products",
			cell: ({ row }) => (
				<div className="">
					{!row.original.products.length ? (
						<div className="font-base text-gray-500 italic">No products available for this category</div>
					) : (
						<div className="">
							{row.original.products
								?.slice(0, 2)
								.map((prod, index) => (
									<span key={index}>
										{prod.name}
										{index !== 1 && row.original.products.length > 1 ? ", " : ""}
									</span>
								))}

							{row.original.products?.length > 2 && " ..."}
						</div>
					)}
				</div>
			)
		},
	]

	return (
		<div className="py-5">
			<AddCategory />

			<div className="mr-5">
				<DataTable
					heading="Categories"
					columns={columns}
					data={data?.data || []}
				/>
			</div>

			<DeleteCategory
				openModal={openModal}
				setOpenModal={setOpenModal}
				selectedCategory={selectedCategory!}
			/>

			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5">
					<SheetHeader>
						<SheetTitle className="text-xl font-semibold mb-0">
							{isEditMode ? "Edit Company" : "Company Details"}
						</SheetTitle>
						<SheetDescription className="mt-0 font-semibold">
							{selectedCategory
								? `${selectedCategory.name}`
								: "No category selected"}
						</SheetDescription>
					</SheetHeader>

					<div>
						{selectedCategory ? (
							isEditMode ? (
								<EditCategory
									category={selectedCategory}
									setOpenSheet={setOpenSheet}
								/>
							) : (
								<ViewCategory category={selectedCategory!} />
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

export default CategoryTable