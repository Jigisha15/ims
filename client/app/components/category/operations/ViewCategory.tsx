import { CategoryFetchInterface, CategoryIntakeInterface } from "@/types/interface"
import ViewField from "../../common/ViewField"
import { Badge } from "@/components/ui/badge"

interface CategoryInterface {
	category: CategoryFetchInterface
}

const ViewCategory = ({ category }: CategoryInterface) => {
	const fields = [
		{ label: "Name", value: category.name },
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

			<div className="flex flex-col gap-2">
				<label htmlFor="">Products</label>
				<div className="flex flex-wrap gap-5">
					{category.products?.length > 0 ? (
						category.products.map((prod, index) => (
							<Badge key={index}>{prod.name}</Badge>
						))
					) : (
						<div className="text-gray-500 text-sm italic">
							No products available for this category.
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ViewCategory