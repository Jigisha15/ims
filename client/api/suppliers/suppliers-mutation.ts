import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createSupplier, deleteSupplier, getOneSupplier, getSuppliers, updateSupplier } from "./suppliers"
import { SupplierIntakeInterface } from "@/types/interface"

export const useGetSuppliers = () => {
	return useQuery({
		queryKey: ["supplier-get-all"],
		queryFn: getSuppliers
	})
}

export const useGetOneSupplier = (supplierId: string) => {
	return useQuery({
		queryKey: ["supplier-get-one"],
		queryFn: () => getOneSupplier(supplierId)
	})
}

export const useAddSupplier = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createSupplier,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["supplier-create"]
			})
		},
		onError: (error) => {
			console.error("Error creating supplier : ", error)
		}
	})
}

export const useUpdateSupplier = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ supplierId, updateData }: { supplierId: string, updateData: Partial<SupplierIntakeInterface> }) => updateSupplier(supplierId, updateData),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["supplier-update"]
			})
		},
		onError: (error) => {
			console.error("Error updating supplier : ", error)
		}
	})
}

export const useDeleteSupplier = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (supplierId: string) => deleteSupplier(supplierId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["supplier-delete"]
			})
		},
		onError: (error) => {
			console.log("Error deleting supplier : ", error)
		}
	})
}