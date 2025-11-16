import OrderCards from "./OrderCards"

const OrderCardComponents = () => {
	const productCardContent = [
		{
			count: 15,
			title: "Total Orders",
			color: "green"
		},
		{
			count: 15,
			title: "Ending Orders",
			color: "orange"
		},
		{
			count: 15,
			title: "End Orders",
			color: "red"
		}
	]

	return (
		<div className="mt-5 mb-2 flex gap-10 items-center bg-gray-100 p-5 rounded-md mr-5">
			<div className="">
				<h1 className="font-bold text-4xl">Order Stats</h1>
				<p className="text-gray-700">Quick order overview</p>
			</div>
			<div className="flex gap-5">
				{productCardContent.map((pdc, index: number) => (
					<OrderCards key={index} count={pdc.count} title={pdc.title} color={pdc.color} />
				))}
			</div>
		</div>
	)
}

export default OrderCardComponents