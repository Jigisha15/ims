"use client"

import { useGetCompanies } from "@/api/company/company-mutation"
import { CompanyFetchInterface, SupplierFetchInterface } from "@/types/interface"
import ViewField from "../../common/ViewField"

interface ViewSupplierInterface {
	supplier: SupplierFetchInterface
}

const ViewSupplier = ({ supplier }: ViewSupplierInterface) => {
	const { data: companyData, isPending, error } = useGetCompanies()

	const company = companyData?.data.find((c: CompanyFetchInterface) => c.id === supplier.companyId);

	const fields = [
		{ label: "Name", value: supplier.name },
		{ label: "Email Id", value: supplier.emailId },
		{ label: "Phone Number", value: supplier.phoneNumber },
		{ label: "Company", value: company?.name ?? "Unknown" },
		{ label: "Role", value: supplier.role },
	]

	return (
		<div className="space-y-3">
			{fields.map((f, index) => (
				<ViewField
					key={index}
					label={f.label}
					value={f.value}
				/>
			))}
		</div>
	)
}

export default ViewSupplier