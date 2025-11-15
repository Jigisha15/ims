import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCategory, deleteCategory, getCategories, getOneCategory, updateCategory } from "./category";
import { CategoryFetchInterface, CategoryIntakeInterface } from "@/types/interface";

export const useGetCategories = () => {
	return useQuery({
		queryKey: ["categories-get-all"],
		queryFn: getCategories,
	});
};

export const useGetOneCategory = (categoryId: string) => {
	return useQuery({
		queryKey: ["category-get-one"],
		queryFn: () => getOneCategory(categoryId),
	});
}

export const useAddCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: addCategory,
		onSuccess: () => {
			//refetch company list if available
			queryClient.invalidateQueries({
				queryKey: ["categories"]
			})
		},
		onError: (error) => {
			console.error("Error adding category : ", error)
		},
	})
}

export const useUpdateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ categoryId, updateData }: {
			categoryId: string,
			updateData: Partial<CategoryFetchInterface>
		}) => updateCategory(categoryId, updateData),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["category-update"]
			})
		},
		onError: (error) => {
			console.error("Error updating category : ", error)
		}
	})
}

export const useDeleteCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (categoryId: string) => deleteCategory(categoryId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["category-delete"]
			})
		},
		onError: (error) => {
			console.log("Error deleting category : ", error)
		}
	})
}