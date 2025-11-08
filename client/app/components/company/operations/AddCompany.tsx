"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Company } from "@/types/interface"
import { Plus } from "lucide-react"
import { useState } from "react"

const AddCompany = () => {
	const [openSheet, setOpenSheet] = useState<boolean>(false)
	const [newCompany, setNewCompany] = useState<Company>({
		name: "",
		emailId: "",
		phoneNumber: "",
		address: "",
		gstin: "",
		createdBy: ""
	})
	return (
		<div className="">
			<div className="pr-5 pb-2 w-full flex justify-end">
				<Button onClick={() => setOpenSheet(true)}>
					<Plus /> Add Company
				</Button>
			</div>

			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
				<SheetContent className="w-1/2 sm:max-w-none px-5 gap-0">
					<SheetHeader className="">
						<SheetTitle className="text-xl font-semibold mb-0">
							Add Company
						</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2 w-full">
							<label className="text-base font-semibold text-gray-600">Name</label>
							<Input
								type="text"
								defaultValue={newCompany.name}
								className="border rounded-md px-2 py-1 text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label className="text-base font-semibold text-gray-600">Email Id</label>
							<Input
								type="text"
								defaultValue={newCompany.emailId}
								className="border rounded-md px-2 py-1 text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label className="text-base font-semibold text-gray-600">Phone Number</label>
							<Input
								type="text"
								defaultValue={newCompany.phoneNumber}
								className="border rounded-md px-2 py-1 text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label className="text-base font-semibold text-gray-600">Address</label>
							<Input
								type="text"
								defaultValue={newCompany.address}
								className="border rounded-md px-2 py-1 text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label className="text-base font-semibold text-gray-600">Gstin</label>
							<Input
								type="text"
								defaultValue={newCompany.gstin}
								className="border rounded-md px-2 py-1 text-base"
							/>
						</div>
						<div className="">
							<Button>Add Company</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default AddCompany