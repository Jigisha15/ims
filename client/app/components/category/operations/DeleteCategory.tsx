"use client"

import { useDeleteCategory } from "@/api/category/category-mutation"
import { CategoryFetchInterface } from "@/types/interface"
import { Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteCategoryInterface {
	openModal: boolean
	setOpenModal: Dispatch<SetStateAction<boolean>>
	selectedCategory: CategoryFetchInterface
}

const DeleteCategory = ({ openModal, setOpenModal, selectedCategory }: DeleteCategoryInterface) => {

	const { mutateAsync: deleteCategoryMutation, isPending } = useDeleteCategory()

	const handleDeleteCompany = async () => {

		if (!selectedCategory) return

		try {
			await deleteCategoryMutation(selectedCategory.id)
			toast.success(`Category ${selectedCategory.name} deleted permanently`)
			setOpenModal(false)
		} catch (error) {
			console.error("Error while deleting company : ", error)
			toast.error("Error while deleting company")
		}
	}

	return (
		<div>
			{openModal && selectedCategory && (
				<Dialog open={openModal} onOpenChange={setOpenModal}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you sure you want to delete this category?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete{" "}
								<span className="font-semibold text-black">{selectedCategory.name}</span> and remove its
								data from the system.
							</DialogDescription>
						</DialogHeader>

						<div className="flex justify-end gap-3 mt-5">
							<Button variant="outline" onClick={() => setOpenModal(false)}>
								Cancel
							</Button>
							<Button
								variant="destructive"
								onClick={handleDeleteCompany}
								disabled={isPending}
							>
								{isPending ? "Deleting..." : "Delete"}
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</div>
	)
}

export default DeleteCategory