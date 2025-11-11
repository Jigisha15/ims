"use client"

import { deleteCompany } from "@/api/company/company"
import { useDeleteCompany } from "@/api/company/company-mutation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CompanyFetchInterface } from "@/types/interface"
import { Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"

interface DeleteCompanyInterface {
	openModal: boolean
	setOpenModal: Dispatch<SetStateAction<boolean>>
	selectedCompany: CompanyFetchInterface
}

const DeleteCompany = ({ openModal, setOpenModal, selectedCompany }: DeleteCompanyInterface) => {

	const { mutateAsync: deleteCompanyMutation, isPending } = useDeleteCompany()

	const handleDeleteCompany = async () => {

		if (!selectedCompany) return

		try {
			await deleteCompanyMutation(selectedCompany.id)
			toast.success(`Company ${selectedCompany.name} deleted permanently`)
			setOpenModal(false)
		} catch (error) {
			console.error("Error while deleting company : ", error)
			toast.error("Error while deleting company")
		}
	}

	return (
		<div>
			{openModal && selectedCompany && (
				<Dialog open={openModal} onOpenChange={setOpenModal}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you sure you want to delete this company?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete{" "}
								<span className="font-semibold text-black">{selectedCompany.name}</span> and remove its
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

export default DeleteCompany