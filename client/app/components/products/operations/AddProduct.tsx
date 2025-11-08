"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Product } from "@/types/interface"
import { Plus } from "lucide-react"
import { useState } from "react"

const AddProduct = () => {
	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [newProduct, setNewProduct] = useState<Product>({
		name: "",
		description: "",
		modelNumber: "",
		category: "",
		sellingPrice: 0,
		stockQuantity: 0,
		costPrice: 0,
		minimumQuantity: 0,
		imageUrl: "",
		companyId: "",
		createdBy: ""
	})

	return (
		<div className="">
			<div className="pr-5 pb-2 w-full flex justify-end">
				<Button onClick={() => setOpenSheet(true)}>
					<Plus /> Add Product
				</Button>
			</div>

			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5 gap-0">
					<SheetHeader className="">
						<SheetTitle className="text-xl font-semibold mb-0">
							Add Product
						</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2 w-full">
							<label className="text-base font-semibold text-gray-600">Name</label>
							<Input
								type="text"
								defaultValue={newProduct.name}
								className="border rounded-md px-2 py-1 text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label className="text-base font-semibold text-gray-600">Category</label>
							<Input
								type="text"
								defaultValue={newProduct.category}
								className="border rounded-md px-2 py-1 text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label className="text-base font-semibold text-gray-600">Description</label>
							<Input
								type="text"
								defaultValue={newProduct.description}
								className="border rounded-md px-2 py-1 text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label className="text-base font-semibold text-gray-600">Model Number</label>
							<Input
								type="text"
								defaultValue={newProduct.modelNumber}
								className="border rounded-md px-2 py-1 text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label className="text-base font-semibold text-gray-600">Cost Price</label>
							<Input
								type="text"
								defaultValue={newProduct.costPrice}
								className="border rounded-md px-2 py-1 text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label className="text-base font-semibold text-gray-600">Selling Price</label>
							<Input
								type="text"
								defaultValue={newProduct.costPrice}
								className="border rounded-md px-2 py-1 text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label className="text-base font-semibold text-gray-600">Stock Quantity</label>
							<Input
								type="text"
								defaultValue={newProduct.stockQuantity}
								className="border rounded-md px-2 py-1 text-base"
							/>
						</div>
						<div className="">
							<Button>Add Product</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default AddProduct