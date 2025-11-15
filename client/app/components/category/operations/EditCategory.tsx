"use client"

import { useUpdateCategory } from "@/api/category/category-mutation"
import { CategoryFetchInterface } from "@/types/interface"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast"
import InputField from "../../common/InputField"
import { Button } from "@/components/ui/button"

interface EditCategoryInterface {
	category: CategoryFetchInterface
	setOpenSheet: (vl: boolean) => void
}

const EditCategory = ({ category, setOpenSheet }: EditCategoryInterface) => {
	const [formData, setFormData] = useState<Partial<CategoryFetchInterface>>({
		id: category.id,
		name: category.name,
	})

	const resetForm = () => {
		setFormData({
			id: "",
			name: "",
		})
	}

	const { mutateAsync: updateCategoryMutation, isPending } = useUpdateCategory()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleUpdateCategory = async () => {
		try {
			await updateCategoryMutation({
				categoryId: category.id,
				updateData: {
					name: formData.name,
				},
			})
			toast.success(`Category "${formData.name}" updated successfully!`)

			setOpenSheet(false)
			resetForm()
		} catch (error) {
			console.error("Error while updating category:", error)
			toast.error("Error while updating category")
		}
	}


	return (
		<div className="flex flex-col gap-4">
			<InputField
				label="Name"
				name="name"
				value={formData.name!}
				onChange={handleChange}
			/>
			<div className="mt-6">
				<Button
					className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2"
					onClick={handleUpdateCategory}
					disabled={isPending}
				>
					{isPending ? "Saving..." : "Save Changes"}
				</Button>
			</div>
		</div>
	)
}

export default EditCategory