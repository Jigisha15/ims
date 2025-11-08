import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { ProductCardsInterface } from "@/types/interface"

const ProductCards = ({ count, title, color }: ProductCardsInterface) => {

	return (
		<Card className="w-60 gap-1">
			<CardDescription
				className="text-5xl text-center font-bold"
				style={{ color: color }}
			>
				{count}
			</CardDescription>
			<CardContent className="text-center text-lg text-gray-700 font-semibold">
				{title}
			</CardContent>
		</Card>
	)
}

export default ProductCards