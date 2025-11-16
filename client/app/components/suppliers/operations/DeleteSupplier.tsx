"use client"

import { useDeleteSupplier } from "@/api/suppliers/suppliers-mutation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SupplierFetchInterface } from "@/types/interface"
import { Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"

interface DeleteSupplierInterface {
	openModal: boolean
	setOpenModal: Dispatch<SetStateAction<boolean>>
	selectedSupplier: SupplierFetchInterface
}

const DeleteSupplier = ({ openModal, setOpenModal, selectedSupplier }: DeleteSupplierInterface) => {

	const { mutateAsync: deleteSupplierMutation, isPending } = useDeleteSupplier()

	const handleDeleteSupplier = async () => {
		if (!selectedSupplier) return

		try {
			await deleteSupplierMutation(selectedSupplier.id)
			toast.success(`Supplier ${selectedSupplier.name} deleted permanently`)
			setOpenModal(false)
		} catch (error) {
			console.error("Error while deleting supplier : ", error)
			toast.error("Error while deleting supplier")
		}
	}

	return (
		<div>
			{openModal && selectedSupplier && (
				<Dialog open={openModal} onOpenChange={setOpenModal}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you sure you want to delete this supplier?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete{" "}
								<span className="font-semibold text-black">{selectedSupplier.name}</span> and remove its
								data from the system.
							</DialogDescription>
						</DialogHeader>

						<div className="flex justify-end gap-3 mt-5">
							<Button variant="outline" onClick={() => setOpenModal(false)}>
								Cancel
							</Button>
							<Button
								variant="destructive"
								onClick={handleDeleteSupplier}
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

export default DeleteSupplier