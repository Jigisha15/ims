import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createOrder, deleteOrder, getOneOrder, getOrders, updateOrder } from "./orders"
import { CustomerIntakeInterface, OrderIntakeInterface } from "@/types/interface"

export const useGetOrders = () => {
	return useQuery({
		queryKey: ["orders-get-all"],
		queryFn: getOrders
	})
}

export const useGetOneOrder = (orderId: string) => {
	return useQuery({
		queryKey: ["orders-get-one"],
		queryFn: () => getOneOrder(orderId)
	})
}


export const useAddOrder = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["order-create"]
			})
		},
		onError: (error) => {
			console.error("Error creating order : ", error)
		}
	})
}

export const useUpdateOrder = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ orderId, updateData }: { orderId: string, updateData: Partial<OrderIntakeInterface> }) => updateOrder(orderId, updateData),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["order-update"]
			})
		},
		onError: (error) => {
			console.error("Error updating order : ", error)
		}
	})
}


export const useDeleteOrder = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (orderId: string) => deleteOrder(orderId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["order-delete"]
			})
		},
		onError: (error) => {
			console.log("Error deleting order : ", error)
		}
	})
}