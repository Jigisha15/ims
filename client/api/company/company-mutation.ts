import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCompanies, getOneCompany } from "./company"
import { addCompany, deleteCompany, updateCompany } from "./company"
import { CompanyIntakeInterface } from "@/types/interface";

export const useGetCompanies = () => {
	return useQuery({
		queryKey: ["companies-get-all"],
		queryFn: getCompanies,
	});
};

export const useGetOneCompany = (companyId: string) => {
	return useQuery({
		queryKey: ["companies-get-one"],
		queryFn: () => getOneCompany(companyId),
	});
}

export const useAddCompany = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: addCompany,
		onSuccess: () => {
			//refetch company list if available
			queryClient.invalidateQueries({
				queryKey: ["companies"]
			})
		},
		onError: (error) => {
			console.error("Error adding company : ", error)
		},
	})
}

export const useUpdateCompany = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ companyId, updateData }: { companyId: string, updateData: Partial<CompanyIntakeInterface> }) => updateCompany(companyId, updateData),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["companies"]
			})
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
			queryClient.invalidateQueries({
				queryKey: ["companies"]
			})
		},
		onError: (error) => {
			console.log("Error deleting company : ", error)
		}
	})
}