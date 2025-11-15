import { ProductInterface } from "@/types/interface"
import ViewField from "../../common/ViewField"

const ViewProduct = ({ product }: ProductInterface) => {
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
				<ViewField label="Name" value={product.name} />
				<ViewField label="Category" value={product.category} />
			</div>

			{/* Full row */}
			<ViewField label="Description" value={product.description} />

			{/* Full row */}
			<ViewField label="Model Number" value={product.modelNumber} />

			{/* 2-column row */}
			<div className="flex items-center justify-between gap-5">
				<ViewField label="Cost Price" value={`₹ ${product.costPrice}`} />
				<ViewField label="Selling Price" value={`₹ ${product.sellingPrice}`} />
			</div>

			{/* Full rows */}
			<ViewField label="Stock Quantity" value={product.stockQuantity} />
			<ViewField label="Company" value={product.companyId} />

		</div>
		//<div className="space-y-3">
		//	<div className="flex items-center justify-between gap-5">
		//		<div className="flex flex-col gap-2 w-full">
		//			<p className="text-base font-semibold text-gray-600">Name</p>
		//			<p className="text-base border rounded-md px-3 py-2">{product.name}</p>
		//		</div>
		//		<div className="flex flex-col gap-2 w-full">
		//			<p className="text-base font-semibold text-gray-600">Category</p>
		//			<p className="text-base border rounded-md px-3 py-2">{product.category}</p>
		//		</div>
		//	</div>
		//	<div className="flex flex-col gap-2">
		//		<p className="text-base font-semibold text-gray-600">Description</p>
		//		<p className="text-base border rounded-md px-3 py-2">{product.description}</p>
		//	</div>
		//	<div className="flex flex-col gap-2">
		//		<p className="text-base font-semibold text-gray-600">Model Number</p>
		//		<p className="text-base border rounded-md px-3 py-2">{product.modelNumber}</p>
		//	</div>
		//	<div className="flex items-center justify-between gap-5">
		//		<div className="flex flex-col gap-2 w-full">
		//			<p className="text-base font-semibold text-gray-600">Cost Price</p>
		//			<p className="text-base border rounded-md px-3 py-2">₹ {product.costPrice}</p>
		//		</div>
		//		<div className="flex flex-col gap-2 w-full">
		//			<p className="text-base font-semibold text-gray-600">Selling Price</p>
		//			<p className="text-base border rounded-md px-3 py-2">₹ {product.sellingPrice}</p>
		//		</div>
		//	</div>
		//	<div className="flex flex-col gap-2">
		//		<p className="text-base font-semibold text-gray-600">Stock Quantity</p>
		//		<p className="text-base border rounded-md px-3 py-2">{product.stockQuantity}</p>
		//	</div>
		//	<div className="flex flex-col gap-2">
		//		<p className="text-base font-semibold text-gray-600">Company</p>
		//		<p className="text-base border rounded-md px-3 py-2">{product.companyId}</p>
		//	</div>
		//</div>
	)
}

export default ViewProduct