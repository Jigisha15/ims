import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCompanies } from "./company"
import { addCompany, deleteCompany, updateCompany } from "./company"

export const useGetCompanies = () => {
	return useQuery({
		queryKey: ["companies"],
		queryFn: getCompanies,
	});
};

export const useAddCompany = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: addCompany,
		onSuccess: () => {
			//refetch company list if available
			queryClient.invalidateQueries({ queryKey: ["companies"] })
		},
		onError: (error) => {
			console.error("Error adding company : ", error)
		},
	})
}

export const useUpdateCompany = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ companyId, updateData }: { companyId: string, updateData: any }) => updateCompany(companyId, updateData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["companies"] })
		},
		onError: (error) => {
			console.error("Error updating company : ", error)
		}
	})
}

export const useDeleteCompany = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (companyId: string) => deleteCompany(companyId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["companies"] })
		},
		onError: (error) => {
			console.log("Error deleting company : ", error)
		}
	})
}