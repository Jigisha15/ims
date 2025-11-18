import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addProduct, deleteProduct, getCategoryWiseProducts, getCompanyWiseProducts, getOneProduct, getProducts, updateProduct } from "./products"
import { ProductFetchInterface, ProductIntakeInterface } from "@/types/interface"

export const useGetProducts = () => {
	return useQuery({
		queryKey: ["products-get-all"],
		queryFn: getProducts
	})
}

export const useGetCategoryProducts = (category: string) => {
	return useQuery({
		queryKey: ["category-get-products"],
		queryFn: () => getCategoryWiseProducts(category)
	})
}

export interface ApiResponse<T> {
	status: number;
	message: string;
	data: T;
}

export const useGetCompanyProducts = (
	companyId: string,
	options?: any
) => {
	return useQuery<ApiResponse<ProductFetchInterface[]>>({
		queryKey: ["company-get-products", companyId],
		queryFn: () => getCompanyWiseProducts(companyId),
		enabled: !!companyId && options?.enabled !== false,
		...options
	})
}

export const useGetOneProduct = (productId: string) => {
	return useQuery({
		queryKey: ["product-get-one"],
		queryFn: () => getOneProduct(productId)
	})
}

export const useAddProduct = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: addProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["product-add"]
			})
		},
		onError: (error) => {
			console.error("Error adding product : ", error)
		}
	})
}

export const useUpdateProduct = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ productId, updateData }: { productId: string, updateData: Partial<ProductIntakeInterface> }) => updateProduct(productId, updateData),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["product-update"]
			})
		},
		onError: (error) => {
			console.error("Error deleting company : ", error)
		}
	})
}

export const useDeleteProduct = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (productId: string) => deleteProduct(productId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["product-delete"]
			})
		},
		onError: (error) => {
			console.log("Error deleting product : ", error)
		}
	})
}