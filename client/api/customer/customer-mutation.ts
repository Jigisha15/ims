import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCustomer, deleteCustomer, getCustomers, getOneCustomer, updateCustomer } from "./customer"
import { CustomerIntakeInterface } from "@/types/interface"

export const useGetCustomers = () => {
	return useQuery({
		queryKey: ["customers-get-all"],
		queryFn: getCustomers
	})
}

export const useGetOneCustomer = (customerId: string) => {
	return useQuery({
		queryKey: ["customers-get-one"],
		queryFn: () => getOneCustomer(customerId)
	})
}

export const useAddCustomer = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createCustomer,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["customer-create"]
			})
		},
		onError: (error) => {
			console.error("Error creating customer : ", error)
		}
	})
}

export const useUpdateCustomer = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ customerId, updateData }: { customerId: string, updateData: Partial<CustomerIntakeInterface> }) => updateCustomer(customerId, updateData),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["customer-update"]
			})
		},
		onError: (error) => {
			console.error("Error updating customer : ", error)
		}
	})
}

export const useDeleteCustomer = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (customerId: string) => deleteCustomer(customerId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["customer-delete"]
			})
		},
		onError: (error) => {
			console.log("Error deleting customer : ", error)
		}
	})
}