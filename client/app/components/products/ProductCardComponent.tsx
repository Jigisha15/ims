import ProductCards from "./ProductCards"

const ProductCardComponent = () => {
	const productCardContent = [
		{
			count: 15,
			title: "Total Products",
			color: "green"
		},
		{
			count: 15,
			title: "Ending Products",
			color: "orange"
		},
		{
			count: 15,
			title: "End Products",
			color: "red"
		}
	]

	return (
		<div className="my-5 flex gap-10 items-center bg-gray-100 p-5 rounded-md mr-5">
			<div className="">
				<h1 className="font-semibold text-3xl">Product Stats</h1>
				<p className="text-gray-800">Stats that give the ultimate glance</p>
			</div>
			<div className="flex gap-5">
				{productCardContent.map((pdc, index: number) => (
					<ProductCards key={index} count={pdc.count} title={pdc.title} color={pdc.color} />
				))}
			</div>
		</div>
	)
}

export default ProductCardComponent