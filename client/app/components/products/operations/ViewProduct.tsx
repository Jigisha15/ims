import { ProductFetchInterface, ProductInterface } from "@/types/interface"
import ViewField from "../../common/ViewField"

interface ViewProductInterface {
	product: ProductFetchInterface
}

const ViewProduct = ({ product }: ViewProductInterface) => {
	const fields = [
		{ label: "Name", value: product.name },
		{ label: "Category", value: product.category },
		{ label: "Description", value: product.description },
		{ label: "Model Number", value: product.modelNumber },
		{ label: "Cost Price", value: product.costPrice },
		{ label: "Selling Price", value: product.sellingPrice },
		{ label: "Stock Quantity", value: product.stockQuantity },
		{ label: "Company", value: product.companyId },
	]

	return (
		<div className="space-y-3">

			{/* 2-column row */}
			<div className="flex items-center justify-between gap-5">
				<div className="w-full">
					<ViewField label="Name" value={product.name} />
				</div>
				<div className="w-full">
					<ViewField label="Company" value={product.company.name} />
				</div>
			</div>
			<ViewField label="Category" value={product.category.name} />

			{/* Full row */}
			<ViewField label="Description" value={product.description} />

			{/* Full row */}
			<ViewField label="Model Number" value={product.modelNumber} />

			{/* 2-column row */}
			<div className="flex items-center justify-between gap-5">
				<div className="w-full">
					<ViewField label="Cost Price" value={`₹ ${product.costPrice}`} />
				</div>
				<div className="w-full">
					<ViewField label="Selling Price" value={`₹ ${product.sellingPrice}`} />
				</div>
			</div>

			{/* Full rows */}
			<ViewField label="Stock Quantity" value={product.stockQuantity} />
		</div>
	)
}

export default ViewProduct