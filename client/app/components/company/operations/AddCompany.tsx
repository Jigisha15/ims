"use client"

import { addCompany } from "@/api/company/company"
import { useAddCompany } from "@/api/company/company-mutation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CompanyIntakeInterface } from "@/types/interface"
import { Plus } from "lucide-react"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast"

const AddCompany = () => {

	//created_by = d57e0910-4bfc-427c-bc7f-ac324d52315d
	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [newCompany, setNewCompany] = useState<CompanyIntakeInterface>({
		name: "",
		emailId: "",
		phoneNumber: "",
		address: "",
		gstin: "",
		createdBy: "d57e0910-4bfc-427c-bc7f-ac324d52315d"
	})

	const resetForm = () => {
		setNewCompany({
			name: "",
			emailId: "",
			phoneNumber: "",
			address: "",
			gstin: "",
			createdBy: "d57e0910-4bfc-427c-bc7f-ac324d52315d"
		})
	}

	const { mutateAsync: addCompanyMutation, isPending } = useAddCompany()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewCompany({ ...newCompany, [e.target.name]: e.target.value })
	}

	const handleAddCompany = async () => {
		try {
			await addCompanyMutation(newCompany)

			toast.success(`Company ${newCompany.name} created successfully!`)

			setOpenSheet(false)
			resetForm()
		} catch (error) {
			console.error("Error while adding company:", error)
			toast.error("Error while adding company")
		}
	}

	return (
		<div>
			<div className="pr-5 pb-2 w-full flex justify-end">
				<Button onClick={() => setOpenSheet(true)}>
					<Plus /> Add Company
				</Button>
			</div>

			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5 gap-0">
					<SheetHeader>
						<SheetTitle className="text-xl font-semibold mb-0">
							Add Company
						</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col gap-4">
						{["name", "emailId", "phoneNumber", "address", "gstin"].map((field) => (
							<div className="flex flex-col gap-2" key={field}>
								<label className="text-base font-semibold text-gray-600 capitalize">{field}</label>

								<Input
									name={field}
									type="text"
									value={newCompany[field as keyof typeof newCompany]}
									onChange={handleChange}
									className="border rounded-md px-2 py-1 text-base"
								/>
							</div>
						))}

						<div className="my-5">
							<Button
								className="w-full bg-green-700 hover:bg-green-800"
								onClick={handleAddCompany}
								disabled={isPending}
							>
								{isPending ? "Saving..." : "Save Changes"}
							</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default AddCompany