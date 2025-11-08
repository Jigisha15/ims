import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { ProductCardsInterface } from "@/types/interface"

const CompanyCards = ({ count, title, color }: ProductCardsInterface) => {
	return (
		<Card className="w-50 h-30 gap-1 border-0 shadow-none">
			<CardDescription
				className="text-4xl text-center font-semibold"
				style={{ color: color }}
			>
				{count}
			</CardDescription>
			<CardContent className="text-center text-lg text-gray-600 font-bold">
				{title}
			</CardContent>
		</Card>
	)
}

export default CompanyCards