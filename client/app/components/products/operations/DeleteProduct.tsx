import { useDeleteProduct } from "@/api/products/products-mutation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProductFetchInterface, ProductInterface } from "@/types/interface"
import { Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"

interface DeleteProductInterface {
	openModal: boolean
	setOpenModal: Dispatch<SetStateAction<boolean>>
	//selectedProduct: ProductFetchInterface
	selectedProduct: ProductInterface
}

const DeleteProduct = ({ openModal, setOpenModal, selectedProduct }: DeleteProductInterface) => {

	const { mutateAsync: deleteProductMutation, isPending } = useDeleteProduct()

	const handleDeleteProduct = async () => {

		if (!selectedProduct) return

		try {
			await deleteProductMutation(selectedProduct.id)
			toast.success(`Product ${selectedProduct.name} deleted permanently`)
			setOpenModal(false)
		} catch (error) {
			console.error("Error while deleting product : ", error)
			toast.error("Error while deleting product")
		}
	}

	return (
		<div>
			{openModal && selectedProduct && (
				<Dialog open={openModal} onOpenChange={setOpenModal}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you sure you want to delete this company?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete{" "}
								<span className="font-semibold text-black">{selectedProduct.name}</span> and remove its
								data from the system.
							</DialogDescription>
						</DialogHeader>

						<div className="flex justify-end gap-3 mt-5">
							<Button variant="outline" onClick={() => setOpenModal(false)}>
								Cancel
							</Button>
							<Button
								variant="destructive"
								onClick={handleDeleteProduct}
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

export default DeleteProduct