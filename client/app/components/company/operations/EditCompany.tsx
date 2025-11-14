"use client"

import { useUpdateCompany } from "@/api/company/company-mutation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CompanyFetchInterface, CompanyInterface } from "@/types/interface"
import { useState } from "react"
import toast from "react-hot-toast"
import InputField from "../../common/InputField"


interface EditCompanyInterface {
	company: CompanyFetchInterface
	setOpenSheet: (vl: boolean) => void
}

const EditCompany = ({ company, setOpenSheet }: EditCompanyInterface) => {
	const [formData, setFormData] = useState({
		name: company.name,
		emailId: company.emailId,
		phoneNumber: company.phoneNumber,
		address: company.address,
		gstin: company.gstin,
	})

	const resetForm = () => {
		setFormData({
			name: "",
			emailId: "",
			phoneNumber: "",
			address: "",
			gstin: "",
		})
	}


	const { mutateAsync: updateCompanyMutation, isPending } = useUpdateCompany()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleUpdateCompany = async () => {
		try {
			await updateCompanyMutation({
				companyId: company.id,
				updateData: formData,
			})
			toast.success(`Company "${formData.name}" updated successfully!`)

			setOpenSheet(false)
		} catch (error) {
			console.error("Error while updating company:", error)
			toast.error("Error while updating company")
		}
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Clean dynamic field rendering */}
			<InputField
				label="Name"
				name="name"
				value={formData.name}
				onChange={handleChange}
			/>
			<InputField
				label="Email Id"
				name="emailId"
				value={formData.emailId}
				onChange={handleChange}
			/>
			<InputField
				label="Phone Number"
				name="phoneNumber"
				value={formData.phoneNumber}
				onChange={handleChange}
			/>
			<InputField
				label="Address"
				name="address"
				value={formData.address}
				onChange={handleChange}
			/>
			<InputField
				label="Gstin"
				name="gstin"
				value={formData.gstin}
				onChange={handleChange}
			/>

			<div className="mt-6">
				<Button
					className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2"
					onClick={handleUpdateCompany}
					disabled={isPending}
				>
					{isPending ? "Saving..." : "Save Changes"}
				</Button>
			</div>
		</div>
	)
}

export default EditCompany