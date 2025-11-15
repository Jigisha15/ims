"use client"

import { useUpdateProduct } from "@/api/products/products-mutation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryFetchInterface, CompanyFetchInterface, EditProductInterface, ProductFetchInterface, ProductInterface } from "@/types/interface"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast"
import InputField from "../../common/InputField"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useGetCompanies } from "@/api/company/company-mutation"
import { useGetCategories } from "@/api/category/category-mutation"

interface EditCompanyInterface {
	product: ProductFetchInterface
	setOpenSheet: (vl: boolean) => void
}

const EditProduct = ({ product, setOpenSheet }: EditCompanyInterface) => {
	const [currentCompany, setCurrentCompany] = useState<CompanyFetchInterface>()
	const [UpdatedCompany, setUpdatedCompany] = useState<CompanyFetchInterface>()
	const [currentCategory, setCurrentCategory] = useState<CategoryFetchInterface>()

	const [formData, setFormData] = useState<ProductFetchInterface>({
		id: product.id,
		name: product.name,
		description: product.description,
		modelNumber: product.modelNumber,
		costPrice: product.costPrice,
		sellingPrice: product.sellingPrice,
		stockQuantity: product.stockQuantity,
		minimumQuantity: product.minimumQuantity,
		imageUrl: product.imageUrl,
		createdAt: product.createdAt,
		updatedAt: product.updatedAt,
		createdBy: product.createdBy,
		updatedBy: product.updatedBy,
		companyId: product.companyId,
		company: product.company,
		category: product.category
	})

	const resetForm = () => {
		setFormData({
			id: "",
			name: "",
			description: "",
			modelNumber: "",
			costPrice: 0,
			sellingPrice: 0,
			stockQuantity: 0,
			minimumQuantity: 0,
			imageUrl: "",
			createdAt: "",
			updatedAt: "",
			createdBy: "",
			updatedBy: "",
			companyId: "",
			company: {},
			category: { id: "", name: "" }
		})
	}

	const { data: companiesData, isLoading: companiesLoading, error: companiesError } = useGetCompanies()
	const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useGetCategories()

	const { mutateAsync: updateProductMutation, isPending } = useUpdateProduct()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleUpdateProduct = async () => {
		try {
			await updateProductMutation({
				productId: product.id,
				updateData: {
					name: formData.name,
					description: formData.description,
					modelNumber: formData.modelNumber,
					costPrice: Number(formData.costPrice),
					sellingPrice: Number(formData.sellingPrice),
					stockQuantity: Number(formData.stockQuantity),
					minimumQuantity: Number(formData.minimumQuantity),
					imageUrl: formData.imageUrl,
					companyId: currentCompany?.id ?? formData.companyId,
					categoryId: currentCategory?.id ?? formData.category.id,
					createdBy: product.createdBy
				}
			});

			toast.success(`Product "${formData.name}" updated successfully!`)

			setOpenSheet(false)
			resetForm()
		} catch (error) {
			console.error("Error while updating product:", error)
			toast.error("Error while updating product")
		}
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Editable inputs */}
			<div className="flex gap-5">
				<InputField
					label="Name"
					name="name"
					value={formData.name}
					onChange={handleChange}
				/>
			</div>
			<div className="flex items-center justify-between gap-5">
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="" className="text-base font-semibold text-gray-600 capitalize">Company</label>
					<DropdownMenu>
						<DropdownMenuTrigger className="border py-1 flex items-center justify-between px-5 rounded-md cursor-pointer">
							{product.company.name ? product.company.name : "Select Company"} <ChevronDown className="w-5 h-5" /></DropdownMenuTrigger>
						<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
							{(companiesData?.data ?? []).map((cmp: CompanyFetchInterface, index: number) => (
								<DropdownMenuItem key={index} onClick={() => setCurrentCompany(cmp)}>
									{cmp.name}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="" className="text-base font-semibold text-gray-600 capitalize">Category</label>
					<DropdownMenu>
						<DropdownMenuTrigger className="border py-1 flex items-center justify-between px-5 rounded-md cursor-pointer">
							{product.category.name ? product.category.name : "Select Cateogry"} <ChevronDown className="w-5 h-5" /></DropdownMenuTrigger>
						<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
							{(categoriesData?.data ?? []).map((cat: CategoryFetchInterface, index: number) => (
								<DropdownMenuItem key={index} onClick={() => setCurrentCategory(cat)}>
									{cat.name}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<InputField
					label="Description"
					name="description"
					value={formData.description}
					onChange={handleChange}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<InputField
					label="Model Number"
					name="modelNumber"
					value={formData.modelNumber}
					onChange={handleChange}
				/>
			</div>
			<div className="flex gap-2">
				<InputField
					label="Cost Price"
					name="costPrice"
					value={`${formData.costPrice}`}
					onChange={handleChange}
				/>
				{/*</div>
				<div className="flex flex-col gap-2">*/}
				<InputField
					label="Selling Price"
					name="sellingPrice"
					value={`${formData.sellingPrice}`}
					onChange={handleChange}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<InputField
					label="Stock Quantity"
					name="stockQuantity"
					value={`${formData.stockQuantity}`}
					onChange={handleChange}
				/>
			</div>
			<div className="my-5">
				<Button
					className="w-full bg-green-700 hover:bg-green-800"
					onClick={handleUpdateProduct}
					disabled={isPending}
				>
					{isPending ? "Saving..." : "Save Changes"}
				</Button>
			</div>
		</div>
	)
}

export default EditProduct