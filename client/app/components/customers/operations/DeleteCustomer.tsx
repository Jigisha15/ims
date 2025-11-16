"use client"

import { useDeleteCustomer } from "@/api/customer/customer-mutation"
import { CustomerFetchInterface } from "@/types/interface"
import { Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


interface DeleteCustomerInterface {
	openModal: boolean
	setOpenModal: Dispatch<SetStateAction<boolean>>
	selectedCustomer: CustomerFetchInterface
}

const DeleteCustomer = ({ openModal, setOpenModal, selectedCustomer }: DeleteCustomerInterface) => {

	const { mutateAsync: deleteCustomerMutation, isPending } = useDeleteCustomer()

	const handleDeleteCustomer = async () => {

		if (!selectedCustomer) return

		try {
			await deleteCustomerMutation(selectedCustomer.id)
			toast.success(`Customer ${selectedCustomer.name} deleted permanently`)
			setOpenModal(false)
		} catch (error) {
			console.error("Error while deleting customer : ", error)
			toast.error("Error while deleting customer")
		}
	}

	return (
		<div>
			{openModal && selectedCustomer && (
				<Dialog open={openModal} onOpenChange={setOpenModal}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you sure you want to delete this company?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete{" "}
								<span className="font-semibold text-black">{selectedCustomer.name}</span> and remove its
								data from the system.
							</DialogDescription>
						</DialogHeader>

						<div className="flex justify-end gap-3 mt-5">
							<Button variant="outline" onClick={() => setOpenModal(false)}>
								Cancel
							</Button>
							<Button
								variant="destructive"
								onClick={handleDeleteCustomer}
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

export default DeleteCustomer