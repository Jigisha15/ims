"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useAddCategory } from "@/api/category/category-mutation"
import toast from "react-hot-toast"
import InputField from "../../common/InputField"

const AddCategory = () => {
	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [newCategory, setNewCategory] = useState<{ name: string }>({ name: "" })

	const { mutateAsync: addCategoryMutation, isPending } = useAddCategory()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewCategory(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const resetForm = async () => {
		setNewCategory({
			name: ""
		})
	}

	const handleAddCategory = async () => {
		try {
			await addCategoryMutation(newCategory)

			toast.success(`Category ${newCategory.name} created successfully!`)

			setOpenSheet(false)
			resetForm()
		} catch (error) {
			console.error("Error while adding category: ", error)
			toast.error("Error while adding category")
		}
	}

	return (
		<div className="">
			<div className="pr-5 pb-2 w-full flex justify-end">
				<Button onClick={() => setOpenSheet(true)}>
					<Plus /> Add Category
				</Button>
			</div>

			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5 gap-0">
					<SheetHeader>
						<SheetTitle className="text-xl font-semibold mb-0">
							Add Category
						</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col gap-4">
						<InputField
							label="Name"
							name="name"
							value={newCategory.name}
							onChange={handleChange}
						/>

						<div className="my-5">
							<Button
								className="w-full bg-green-700 hover:bg-green-800"
								onClick={handleAddCategory}
								disabled={isPending}
							>
								{isPending ? "Saving..." : "Save Changes"}
							</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default AddCategory