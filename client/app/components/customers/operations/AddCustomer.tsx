"use client"

import { useAddCustomer } from "@/api/customer/customer-mutation"
import { Button } from "@/components/ui/button"
import { CompanyFetchInterface, CustomerIntakeInterface } from "@/types/interface"
import { ChevronDown, Plus } from "lucide-react"
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import InputField from "../../common/InputField"
import { useGetCompanies } from "@/api/company/company-mutation"



const AddCustomer = () => {
	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [currentCompany, setCurrentCompany] = useState<CompanyFetchInterface>()
	const [newCustomer, setNewCustomer] = useState<CustomerIntakeInterface>({
		name: "",
		emailId: "",
		phoneNumber: "",
		address: "",
		companyId: "",
		createdBy: "",
		role: ""
	})

	const resetForm = () => {
		setNewCustomer({
			name: "",
			emailId: "",
			phoneNumber: "",
			address: "",
			companyId: "",
			createdBy: "",
			role: ""
		})
	}

	const { mutateAsync: addCustomerMutation, isPending } = useAddCustomer()
	const { data: companyData, isPending: companyPending, error: companyError } = useGetCompanies()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value })
	}

	const handleAddProduct = async () => {
		try {
			// create the payload
			const payload = {
				...newCustomer,
				companyId: currentCompany?.id!,
				createdBy: "d57e0910-4bfc-427c-bc7f-ac324d52315d"
			}
			await addCustomerMutation(payload)

			toast.success(`Customer "${newCustomer.name}" added for ${currentCompany?.name} successfully!`)

			setOpenSheet(false)
			resetForm()
		} catch (error) {
			console.error("Error while adding product:", error)
			toast.error("Error while adding product")
		}
	}

	return (
		<div className="">
			<div className="pr-5 pb-2 w-full flex justify-end">
				<Button onClick={() => setOpenSheet(true)}>
					<Plus /> Add Product
				</Button>
			</div>

			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5 gap-0">
					<SheetHeader className="">
						<SheetTitle className="text-xl font-semibold mb-0">
							Add Product
						</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2 w-full">
							<InputField
								label="Name"
								name="name"
								value={newCustomer.name}
								onChange={handleChange}
							/>
						</div>
						<div className="flex items-center justify-between gap-5">
							<div className="flex flex-col gap-2 w-full">
								<label htmlFor="" className="text-base font-semibold text-gray-600 capitalize">Company</label>
								<DropdownMenu>
									<DropdownMenuTrigger className="border py-1 flex items-center justify-between px-5 rounded-md cursor-pointer">Select Company <ChevronDown className="w-5 h-5" /></DropdownMenuTrigger>
									<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
										{(companyData?.data ?? []).map((cmp: CompanyFetchInterface, index: number) => (
											<DropdownMenuItem key={index} onClick={() => setCurrentCompany(cmp)}>
												{cmp.name}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<InputField
								label="Email Id"
								name="emailId"
								value={newCustomer.emailId}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<InputField
								label="Phone Number"
								name="phoneNumber"
								value={newCustomer.phoneNumber}
								onChange={handleChange}
							/>
						</div>
						<div className="flex items-center justify-between gap-5">
							<div className="flex flex-col gap-2 w-full">
								<InputField
									label="Address"
									name="address"
									value={`${newCustomer.address}`}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<InputField
							label="Role"
							name="role"
							value={`${newCustomer.role}`}
							onChange={handleChange}
						/>
					</div>

					<div className="">
						<Button onClick={handleAddProduct}>Add Product</Button>
					</div>
				</SheetContent>
			</Sheet>
		</div >
	)
}

export default AddCustomer