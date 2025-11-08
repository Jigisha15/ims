import { CompanyInterface } from "@/types/interface"

const ViewCompany = ({ company }: CompanyInterface) => {
	return (
		<div className="space-y-3">
			<div className="flex flex-col gap-2">
				<p className="text-base font-semibold text-gray-600">Name</p>
				<p className="text-base border rounded-md px-3 py-2">{company.name}</p>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-base font-semibold text-gray-600">Category</p>
				<p className="text-base border rounded-md px-3 py-2">{company.emailId}</p>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-base font-semibold text-gray-600">Description</p>
				<p className="text-base border rounded-md px-3 py-2">{company.phoneNumber}</p>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-base font-semibold text-gray-600">Model Number</p>
				<p className="text-base border rounded-md px-3 py-2">{company.address}</p>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-base font-semibold text-gray-600">Cost Price</p>
				<p className="text-base border rounded-md px-3 py-2">₹ {company.gstin}</p>
			</div>
		</div>
	)
}

export default ViewCompany