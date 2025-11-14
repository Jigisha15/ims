"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CompanyFetchInterface, ProductFetchInterface, ProductIntakeInterface } from "@/types/interface"
import { ChevronDown, Plus } from "lucide-react"
import { useState } from "react"
import InputField from "../../common/InputField"
import { useAddProduct } from "@/api/products/products-mutation"
import toast from "react-hot-toast"
import { useGetCompanies } from "@/api/company/company-mutation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const AddProduct = () => {
	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [currentCompany, setCurrentCompany] = useState<CompanyFetchInterface>()
	const [newProduct, setNewProduct] = useState<ProductIntakeInterface>({
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

	const resetForm = () => {
		setNewProduct({
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
	}

	const { data, isLoading, error } = useGetCompanies()

	const { mutateAsync: addProductMutation, isPending } = useAddProduct()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
	}

	const handleAddProduct = async () => {
		try {
			// make the payload first
			const payload = {
				...newProduct,
				createdBy: "d57e0910-4bfc-427c-bc7f-ac324d52315d",
				companyId: currentCompany?.id
			}
			await addProductMutation(newProduct)

			toast.success(`Product "${newProduct.name}" added successfully!`)

			setOpenSheet(false)
			resetForm()
		} catch (error) {
			console.error("Error while adding product:", error)
			toast.error("Error while adding product")
		}
	}

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
							<InputField
								label="Name"
								name="name"
								value={newProduct.name}
								onChange={handleChange}
							/>
						</div>
						<div className="flex items-center justify-between gap-5">
							<div className="flex flex-col gap-2 w-full">
								<label htmlFor="" className="text-base font-semibold text-gray-600 capitalize">Company</label>
								<DropdownMenu>
									<DropdownMenuTrigger className="border py-1 flex items-center justify-between px-5 rounded-md cursor-pointer">Select Company <ChevronDown className="w-5 h-5" /></DropdownMenuTrigger>
									<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
										{data.data.map((cmp: CompanyFetchInterface, index: number) => (
											<DropdownMenuItem onClick={() => setCurrentCompany(cmp)}>{cmp.name}</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<div className="flex flex-col gap-2 w-full">
								<InputField
									label="Category"
									name="category"
									value={newProduct.category}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<InputField
								label="Description"
								name="description"
								value={newProduct.description}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<InputField
								label="Model Number"
								name="modelNumber"
								value={newProduct.modelNumber}
								onChange={handleChange}
							/>
						</div>
						<div className="flex items-center justify-between gap-5">
							<div className="flex flex-col gap-2 w-full">
								<InputField
									label="Cost Price (Rs.)"
									name="costPrice"
									value={`${newProduct.costPrice}`}
									onChange={handleChange}
								/>
							</div>
							<div className="flex flex-col gap-2 w-full">
								<InputField
									label="Selling Price (Rs.)"
									name="sellingPrice"
									value={`${newProduct.sellingPrice}`}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<InputField
								label="Stock Quantity"
								name="stockQuantity"
								value={`${newProduct.stockQuantity}`}
								onChange={handleChange}
							/>
						</div>

						<div className="">
							<Button onClick={handleAddProduct}>Add Product</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default AddProduct