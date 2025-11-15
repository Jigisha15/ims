import { CompanyInterface } from "@/types/interface"
import ViewField from "../../common/ViewField"

const ViewCompany = ({ company }: CompanyInterface) => {
	const fields = [
		{ label: "Name", value: company.name },
		{ label: "Category", value: company.emailId },
		{ label: "Description", value: company.phoneNumber },
		{ label: "Model Number", value: company.address },
		{ label: "Cost Price", value: company.gstin, prefix: "₹" },
	]

	return (
		<div className="space-y-3">
			{fields.map((field, index) => (
				<ViewField
					key={index}
					label={field.label}
					value={field.value}
				/>
			))}
		</div>
	)
}

export default ViewCompany