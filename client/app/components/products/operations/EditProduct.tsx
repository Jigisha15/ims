"use client"

import { useUpdateProduct } from "@/api/products/products-mutation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CompanyFetchInterface, EditProductInterface, ProductFetchInterface, ProductInterface } from "@/types/interface"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast"
import InputField from "../../common/InputField"

interface EditCompanyInterface {
	product: ProductFetchInterface
	setOpenSheet: (vl: boolean) => void
}

const EditProduct = ({ product, setOpenSheet }: EditCompanyInterface) => {
	const [currentCompany, setCurrentCompany] = useState<CompanyFetchInterface>()
	const [UpdatedCompany, setUpdatedCompany] = useState<CompanyFetchInterface>()

	const [formData, setFormData] = useState<ProductFetchInterface>({
		id: product.id,
		name: product.name,
		description: product.description,
		modelNumber: product.modelNumber,
		category: product.category,
		costPrice: product.costPrice,
		sellingPrice: product.sellingPrice,
		stockQuantity: product.stockQuantity,
		minimumQuantity: product.minimumQuantity,
		imageUrl: product.imageUrl,
		companyId: product.companyId,
		createdAt: product.createdAt,
		updatedAt: product.updatedAt,
		createdBy: product.createdBy,
		updatedBy: product.updatedBy,
	})

	const resetForm = () => {
		setFormData({
			id: "",
			name: "",
			description: "",
			modelNumber: "",
			category: "",
			costPrice: 0,
			sellingPrice: 0,
			stockQuantity: 0,
			minimumQuantity: 0,
			imageUrl: "",
			companyId: "",
			createdAt: "",
			updatedAt: "",
			createdBy: "",
			updatedBy: "",
		})
	}

	const { mutateAsync: updateProductMutation, isPending } = useUpdateProduct()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleUpdateProduct = async () => {
		try {
			await updateProductMutation({
				productId: product.id,
				updateData: formData,
			})
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
				<div className="flex flex-col gap-2 w-full">
					<InputField
						label="Name"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<InputField
						label="Category"
						name="category"
						value={formData.category}
						onChange={handleChange}
					/>
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
			<div className="flex flex-col gap-2">
				<InputField
					label="Cost Price"
					name="costPrice"
					value={`${formData.costPrice}`}
					onChange={handleChange}
				/>
			</div>
			<div className="flex flex-col gap-2">
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