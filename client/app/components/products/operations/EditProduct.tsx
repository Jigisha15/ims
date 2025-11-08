import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductInterface } from "@/types/interface"

const EditProduct = ({ product }: ProductInterface) => {
	return (
		<div className="flex flex-col gap-4">
			{/* Editable inputs */}
			<div className="flex gap-5">
				<div className="flex flex-col gap-2 w-full">
					<label className="text-base font-semibold text-gray-600">Name</label>
					<Input
						type="text"
						defaultValue={product.name}
						className="border rounded-md px-2 py-1 text-base"
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label className="text-base font-semibold text-gray-600">Category</label>
					<Input
						type="text"
						defaultValue={product.name}
						className="border rounded-md px-2 py-1 text-base"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-base font-semibold text-gray-600">Description</label>
				<Input
					type="text"
					defaultValue={product.description}
					className="border rounded-md px-2 py-1 text-base"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-base font-semibold text-gray-600">Model Number</label>
				<Input
					type="text"
					defaultValue={product.modelNumber}
					className="border rounded-md px-2 py-1 text-base"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-base font-semibold text-gray-600">Cost Price</label>
				<Input
					type="number"
					defaultValue={product.costPrice}
					className="border rounded-md px-2 py-1 text-base"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-base font-semibold text-gray-600">Selling Price</label>
				<Input
					type="number"
					defaultValue={product.sellingPrice}
					className="border rounded-md px-2 py-1 text-base"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-base font-semibold text-gray-600">Stock Quantity</label>
				<Input
					type="number"
					defaultValue={product.stockQuantity}
					className="border rounded-md px-2 py-1 text-base"
				/>
			</div>
			<div className="my-5">
				<Button className="w-full bg-green-700 hover:bg-green-800">
					Save Changes
				</Button>
			</div>
		</div>
	)
}

export default EditProduct