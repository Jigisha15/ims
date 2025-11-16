"use client"

import { useGetCompanies } from "@/api/company/company-mutation"
import { useUpdateCustomer } from "@/api/customer/customer-mutation"
import { CompanyFetchInterface, CompanyIntakeInterface, CustomerFetchInterface, CustomerIntakeInterface } from "@/types/interface"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast"
import InputField from "../../common/InputField"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface EditCustomerInterface {
	customer: CustomerFetchInterface
	setOpenSheet: (vl: boolean) => void
}

const EditCustomer = ({ customer, setOpenSheet }: EditCustomerInterface) => {
	const [formData, setFormData] = useState<CustomerIntakeInterface>({
		name: customer.name,
		emailId: customer.emailId,
		phoneNumber: customer.phoneNumber,
		address: customer.address,
		role: customer.role,
		companyId: customer.companyId,
		createdBy: customer.createdBy
	})

	const resetForm = () => {
		setFormData({
			name: "",
			emailId: "",
			phoneNumber: "",
			address: "",
			role: "",
			companyId: "",
			createdBy: ""
		})
	}

	// Fetch all companies
	const { data: companiesData } = useGetCompanies()
	const companies = companiesData?.data ?? []

	// Get the currently selected company object
	const selectedCompany = companies.find((c: CompanyFetchInterface) => c.id === formData.companyId)

	// Update customer mutation
	const { mutateAsync: updateCustomerMutation, isPending } = useUpdateCustomer()

	// Handle input update
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleCompanySelect = (cmp: CompanyFetchInterface) => {
		setFormData(prev => ({ ...prev, companyId: cmp.id }))
	}

	const handleUpdateCustomer = async () => {
		try {
			await updateCustomerMutation({
				customerId: customer.id,
				updateData: formData
			})

			toast.success(`Customer "${formData.name}" updated successfully!`)
			setOpenSheet(false)
			resetForm()
		} catch (error) {
			console.error("Error while updating product:", error)
			toast.error("Error while updating product")
		}
	}

	// fields list
	const inputFields = [
		{ label: "Name", name: "name" },
		{ label: "Email Id", name: "emailId" },
		{ label: "Phone Number", name: "phoneNumber" },
		{ label: "Address", name: "address" },
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
					value={formData[field.name as keyof CustomerIntakeInterface] as string}
					onChange={handleChange}
				/>
			))}

			{/* Company Dropdown */}
			<div className="flex flex-col gap-2 w-full">
				<label className="text-base font-semibold text-gray-600 capitalize">Company</label>

				<DropdownMenu>
					<DropdownMenuTrigger className="border py-1 flex items-center justify-between px-5 rounded-md cursor-pointer">
						{selectedCompany?.name || "Select Company"}
						<ChevronDown className="w-5 h-5" />
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
						{companies.map((cmp: CompanyFetchInterface) => (
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

export default EditCustomer