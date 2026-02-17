import ProductCards from "./ProductCards"

interface ProdCardsInterface {
	inStock: number
	lowStock: number
	outOfStock: number
}

const ProductCardComponent = ({ inStock, lowStock, outOfStock }: ProdCardsInterface) => {
	const productCardContent = [
		{
			count: inStock,
			title: "Total Products",
			color: "green"
		},
		{
			count: lowStock,
			title: "Ending Products",
			color: "orange"
		},
		{
			count: outOfStock,
			title: "End Products",
			color: "red"
		}
	]

	return (
		<div className="mt-5 mb-2 flex gap-10 items-center bg-gray-100 p-5 rounded-md mr-5">
			<div className="">
				<h1 className="font-bold text-4xl">Product Stats</h1>
				<p className="text-gray-700">Quick product overview</p>
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