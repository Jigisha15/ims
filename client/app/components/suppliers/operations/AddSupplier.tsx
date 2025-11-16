"use client"

import { useGetCompanies } from "@/api/company/company-mutation"
import { useAddSupplier } from "@/api/suppliers/suppliers-mutation"
import { Button } from "@/components/ui/button"
import { CompanyFetchInterface, SupplierIntakeInterface } from "@/types/interface"
import { ChevronDown, Plus } from "lucide-react"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import InputField from "../../common/InputField"

const AddSupplier = () => {
	const [openSheet, setOpenSheet] = useState<boolean>(false)

	const [newSupplier, setNewSupplier] = useState<SupplierIntakeInterface>({
		name: "",
		emailId: "",
		phoneNumber: "",
		role: "",
		companyId: ""
	})

	const resetForm = () => {
		setNewSupplier({
			name: "",
			emailId: "",
			phoneNumber: "",
			role: "",
			companyId: ""
		})
	}

	const { mutateAsync: addSupplierMutation, isPending } = useAddSupplier()
	const { data: companyData } = useGetCompanies()

	const companies = companyData?.data ?? []

	// Currently selected company object
	const selectedCompany = companies.find((c: CompanyFetchInterface) => c.id === newSupplier.companyId)

	// Handle input
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewSupplier(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	// Handle company selection
	const handleCompanySelect = (cmp: CompanyFetchInterface) => {
		setNewSupplier(prev => ({ ...prev, companyId: cmp.id }))
	}

	// Submit supplier
	const handleAddSupplier = async () => {
		try {
			await addSupplierMutation(newSupplier)

			toast.success(
				`Supplier "${newSupplier.name}" added for ${selectedCompany?.name ?? "Selected Company"} successfully!`
			)

			setOpenSheet(false)
			resetForm()
		} catch (error) {
			console.error("Error while adding supplier:", error)
			toast.error("Error while adding supplier")
		}
	}

	// Dynamic input list
	const inputFields = [
		{ label: "Name", name: "name" },
		{ label: "Email Id", name: "emailId" },
		{ label: "Phone Number", name: "phoneNumber" },
		{ label: "Role", name: "role" },
	]

	return (
		<div>
			{/* Top Button */}
			<div className="pr-5 pb-2 w-full flex justify-end">
				<Button onClick={() => setOpenSheet(true)}>
					<Plus /> Add Supplier
				</Button>
			</div>

			{/* Sheet */}
			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5 gap-0">

					<SheetHeader>
						<SheetTitle className="text-xl font-semibold">Add Supplier</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col gap-4 mt-4">

						{/* INPUT FIELDS LOOP */}
						{inputFields.map(field => (
							<InputField
								key={field.name}
								label={field.label}
								name={field.name}
								value={newSupplier[field.name as keyof SupplierIntakeInterface] as string}
								onChange={handleChange}
							/>
						))}

						{/* COMPANY DROPDOWN */}
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

						{/* SUBMIT BUTTON */}
						<div className="mt-4">
							<Button
								className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2"
								onClick={handleAddSupplier}
								disabled={isPending}
							>
								{isPending ? "Saving..." : "Add Supplier"}
							</Button>
						</div>

					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default AddSupplier