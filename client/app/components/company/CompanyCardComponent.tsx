import CompanyCards from "./CompanyCards"

const CompanyCardComponent = () => {
	const companyCardContent = [
		{
			count: 15,
			title: "Total Companies",
			color: "green"
		},
		{
			count: 15,
			title: "Frequent Contact",
			color: "orange"
		},
		{
			count: 15,
			title: "Low contact",
			color: "red"
		}
	]

	return (
		<div className="mt-5 mb-2 flex gap-10 items-center bg-gray-100 p-5 rounded-md mr-5">
			<div className="">
				<h1 className="font-bold text-4xl">Company Stats</h1>
				<p className="text-gray-700">Quick company overview</p>
			</div>
			<div className="flex gap-5">
				{companyCardContent.map((pdc, index: number) => (
					<CompanyCards key={index} count={pdc.count} title={pdc.title} color={pdc.color} />
				))}
			</div>
		</div>
	)
}

export default CompanyCardComponent