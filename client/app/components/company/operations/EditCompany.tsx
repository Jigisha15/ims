import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CompanyInterface } from "@/types/interface"

const EditCompany = ({ company }: CompanyInterface) => {
	return (
		<div className="flex flex-col gap-4">
			{/* Editable inputs */}
			<div className="flex flex-col gap-2">
				<label className="text-base font-semibold text-gray-600">Name</label>
				<Input
					type="text"
					defaultValue={company.name}
					className="border rounded-md px-2 py-1 text-base"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-base font-semibold text-gray-600">Email Id</label>
				<Input
					type="text"
					defaultValue={company.emailId}
					className="border rounded-md px-2 py-1 text-base"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-base font-semibold text-gray-600">Phone Number</label>
				<Input
					type="text"
					defaultValue={company.phoneNumber}
					className="border rounded-md px-2 py-1 text-base"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-base font-semibold text-gray-600">Address</label>
				<Input
					type="text"
					defaultValue={company.address}
					className="border rounded-md px-2 py-1 text-base"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-base font-semibold text-gray-600">Gstin</label>
				<Input
					type="number"
					defaultValue={company.gstin}
					className="border rounded-md px-2 py-1 text-base"
				/>
			</div>
			<div className="my-5">
				<Button className="w-full bg-green-700 hover:bg-green-800">
					Save Changes
				</Button>
			</div>
		</div>
	)
}

export default EditCompany