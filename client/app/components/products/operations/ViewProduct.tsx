import { ProductInterface } from "@/types/interface"

const ViewProduct = ({ product }: ProductInterface) => {
	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between gap-5">
				<div className="flex flex-col gap-2 w-full">
					<p className="text-base font-semibold text-gray-600">Name</p>
					<p className="text-base border rounded-md px-3 py-2">{product.name}</p>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<p className="text-base font-semibold text-gray-600">Category</p>
					<p className="text-base border rounded-md px-3 py-2">{product.category}</p>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-base font-semibold text-gray-600">Description</p>
				<p className="text-base border rounded-md px-3 py-2">{product.description}</p>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-base font-semibold text-gray-600">Model Number</p>
				<p className="text-base border rounded-md px-3 py-2">{product.modelNumber}</p>
			</div>
			<div className="flex items-center justify-between gap-5">
				<div className="flex flex-col gap-2 w-full">
					<p className="text-base font-semibold text-gray-600">Cost Price</p>
					<p className="text-base border rounded-md px-3 py-2">₹ {product.costPrice}</p>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<p className="text-base font-semibold text-gray-600">Selling Price</p>
					<p className="text-base border rounded-md px-3 py-2">₹ {product.sellingPrice}</p>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-base font-semibold text-gray-600">Stock Quantity</p>
				<p className="text-base border rounded-md px-3 py-2">{product.stockQuantity}</p>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-base font-semibold text-gray-600">Company</p>
				<p className="text-base border rounded-md px-3 py-2">{product.companyId}</p>
			</div>
		</div>
	)
}

export default ViewProduct