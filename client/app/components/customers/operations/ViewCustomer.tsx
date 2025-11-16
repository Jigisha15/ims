import { CompanyFetchInterface, CustomerFetchInterface } from "@/types/interface"
import ViewField from "../../common/ViewField"
import { useGetCompanies } from "@/api/company/company-mutation"

interface ViewCustomerInterface {
	customer: CustomerFetchInterface
}

const ViewCustomer = ({ customer }: ViewCustomerInterface) => {
	const { data: companyData, isPending, error } = useGetCompanies()

	const company = companyData?.data.find((c: CompanyFetchInterface) => c.id === customer.companyId);

	const fields = [
		{ label: "Name", value: customer.name },
		{ label: "Email Id", value: customer.emailId },
		{ label: "Phone Number", value: customer.phoneNumber },
		{ label: "Address", value: customer.address },
		{ label: "Company", value: company?.name ?? "Unknown" },
		{ label: "Role", value: customer.role },
	]
	return (
		<div className="space-y-3">
			{fields.map((f, index) => (
				<ViewField
					label={f.label}
					value={f.value}
				/>
			))}
		</div>
	)
}

export default ViewCustomer