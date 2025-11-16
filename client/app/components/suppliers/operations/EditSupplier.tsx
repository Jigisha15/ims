"use client"

import { useGetCompanies, useGetOneCompany } from "@/api/company/company-mutation"
import { useUpdateSupplier } from "@/api/suppliers/suppliers-mutation"
import { CompanyFetchInterface, SupplierFetchInterface, SupplierIntakeInterface } from "@/types/interface"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast"
import InputField from "../../common/InputField"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditSupplierInterface {
	supplier: SupplierFetchInterface
	setOpenSheet: (vl: boolean) => void
}

const EditSupplier = ({ supplier, setOpenSheet }: EditSupplierInterface) => {
	const [formData, setFormData] = useState<SupplierFetchInterface>({
		id: supplier.id,
		name: supplier.name,
		emailId: supplier.emailId,
		phoneNumber: supplier.phoneNumber,
		role: supplier.role,
		createdAt: supplier.createdAt,
		updatedAt: supplier.updatedAt,
		companyId: supplier.companyId
	})

	const resetForm = () => {
		setFormData({
			id: "",
			name: "",
			emailId: "",
			phoneNumber: "",
			role: "",
			createdAt: "",
			updatedAt: "",
			companyId: ""
		})
	}

	// Fetch all companies
	const { data: companiesData } = useGetCompanies()
	const companies = companiesData?.data ?? []

	// Get the currently selected company object
	const selectedCompany = companies.find((c: CompanyFetchInterface) => c.id === formData.companyId)

	// Update customer mutation
	const { mutateAsync: updateSupplierMutation, isPending } = useUpdateSupplier()

	// Handle input update
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleCompanySelect = (cmp: CompanyFetchInterface) => {
		setFormData(prev => ({ ...prev, companyId: cmp.id }))
	}

	const handleUpdateCustomer = async () => {
		try {
			await updateSupplierMutation({
				supplierId: supplier.id,
				updateData: formData
			})

			toast.success(`Supplier ${formData.name}" updated successfully!`)
			setOpenSheet(false)
			resetForm()
		} catch (error) {
			console.error("Error while updating supplier:", error)
			toast.error("Error while updating supplier")
		}
	}

	// fields list
	const inputFields = [
		{ label: "Name", name: "name" },
		{ label: "Email Id", name: "emailId" },
		{ label: "Phone Number", name: "phoneNumber" },
		{ label: "Role", name: "role" },
	]

	return (
		<div className="flex flex-col gap-4">
			{/* input fields */}
			{inputFields.map(field => (
				<InputField
					key={field.name}
					label={field.label}
					name={field.name}
					value={formData[field.name as keyof SupplierIntakeInterface] as string}
					onChange={handleChange}
				/>
			))}

			{/* Company Dropdown */}
			<div className="flex flex-col gap-2 w-full">
				<label className="text-base font-semibold text-gray-600 capitalize">Company</label>

				<DropdownMenu>
					<DropdownMenuTrigger className="border py-1 flex items-center justify-between px-5 rounded-md cursor-pointer">
						{selectedCompany?.data?.name || "Select Company"}
						<ChevronDown className="w-5 h-5" />
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
						{companiesData?.data.map((cmp: CompanyFetchInterface) => (
							<DropdownMenuItem key={cmp.id} onClick={() => handleCompanySelect(cmp)}>
								{cmp.name}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="mt-6">
				<Button
					className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2"
					onClick={handleUpdateCustomer}
					disabled={isPending}
				>
					{isPending ? "Saving..." : "Save Changes"}
				</Button>
			</div>
		</div>
	)
}

export default EditSupplier