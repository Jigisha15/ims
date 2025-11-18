"use client"

import { useGetCompanies } from "@/api/company/company-mutation"
import { useGetCompanyCustomer } from "@/api/customer/customer-mutation"
import { useAddOrder } from "@/api/orders/orders-mutation"
import { useGetCompanyProducts, useGetProducts } from "@/api/products/products-mutation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ORDER_STATUS } from "@/types/enum"
import { CompanyFetchInterface, CustomerFetchInterface, OrderIntakeInterface, OrderItemsIntakInterface, ProductFetchInterface } from "@/types/interface"
import { ChevronDown, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const AddOrder = () => {
	const [selectedCompany, setSelectedCompany] = useState<CompanyFetchInterface | null>(null);
	const [selectedCustomer, setSelectedCustomer] = useState<CustomerFetchInterface | null>(null);
	const [selectedProduct, setSelectedProduct] = useState<ProductFetchInterface | null>(null);
	const [editIndex, setEditIndex] = useState<number | null>(null);

	const [orderItems, setOrderItems] = useState<OrderItemsIntakInterface[]>([]);
	const [newItem, setNewItem] = useState<OrderItemsIntakInterface>({
		productId: "",
		quantity: 1,
		price: 0,
		subtotal: 0,
	});

	// Calculate the sub-total for every newItem
	useEffect(() => {
		if (selectedProduct?.sellingPrice) {
			setNewItem(prev => ({
				...prev,
				price: selectedProduct.sellingPrice,
				subtotal: prev.quantity * selectedProduct.sellingPrice
			}));
		}
	}, [newItem.quantity, selectedProduct?.sellingPrice]);

	// Add OR Update order item
	const addOrderItem = () => {
		if (!newItem.productId) return toast.error("Select a product!");
		if (newItem.quantity <= 0) return toast.error("Quantity must be > 0");

		// Prevent duplicates in ADD mode
		if (editIndex === null) {
			const isDuplicate = orderItems.some(
				(item) => item.productId === newItem.productId
			);

			if (isDuplicate) {
				toast.error("This product is already added! Edit it instead.");
				return;
			}

			setOrderItems(prev => [...prev, newItem]);
		} else {
			// EDIT mode
			setOrderItems(prev => {
				const updated = [...prev];
				updated[editIndex] = newItem;
				return updated;
			});

			setEditIndex(null);
		}

		// reset
		setNewItem({
			productId: "",
			quantity: 1,
			price: 0,
			subtotal: 0
		});
	};


	// Remove the order-item
	const removeItem = (index: number) => {
		setOrderItems(prev => prev.filter((_, i) => i !== index));
	};

	const { data: companiesData } = useGetCompanies();

	const { data: productsData } = useGetCompanyProducts(
		selectedCompany?.id as string,
		{ enabled: !!selectedCompany?.id }
	);

	const { data: companyCustomerData } = useGetCompanyCustomer(
		selectedCompany?.id as string,
		{ enabled: !!selectedCompany?.id }
	);

	const { mutateAsync: addOrderMutation, isPending } = useAddOrder()

	const handleCreateOrder = async () => {
		try {
			const payload: OrderIntakeInterface = {
				companyId: selectedCompany?.id!,
				customerId: selectedCustomer?.id!,
				totalAmount: 0,
				status: ORDER_STATUS.PENDING,
				orderItems: orderItems
			}
			addOrderMutation(payload)
			toast.success("Order placed successfully!")
		} catch (error) {
			console.error("Error while placing order: ", error)
			toast.error("Error while placing order")
		}
	}

	return (
		<div className="p-5">
			<h1 className="text-2xl font-semibold mb-5">Create a new Order</h1>

			<div className="flex items-center gap-10">

				{/* Select Company */}
				<DropdownMenu>
					<DropdownMenuTrigger
						className="border px-5 py-2 rounded-md bg-white cursor-pointer flex justify-between items-center gap-8"
					>
						{selectedCompany ? selectedCompany.name : "Select Company"}
						<ChevronDown className="w-5 h-5 mt-1" />
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
						{companiesData?.data?.map((cmp: CompanyFetchInterface, index: number) => (
							<DropdownMenuItem
								key={index}
								onClick={() => setSelectedCompany(cmp)}
							>
								{cmp.name}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Select Customer */}
				<DropdownMenu>
					<DropdownMenuTrigger
						className="border px-5 py-2 rounded-md bg-white flex justify-between items-center gap-8 disabled:cursor-not-allowed"
						disabled={!selectedCompany}
					>
						{selectedCustomer ? selectedCustomer.name : "Select Customer"}
						<ChevronDown className="w-5 h-5 mt-1" />
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
						{companyCustomerData?.data?.map((cust: CustomerFetchInterface, index: number) => (
							<DropdownMenuItem
								key={index}
								onClick={() => setSelectedCustomer(cust)}
							>
								{cust.name}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Order Items Table */}
			<div className="mt-10">

				<h2 className="text-xl font-semibold mb-4">Add Order Items</h2>

				{/* Row for adding new order item */}
				<div className="flex items-center gap-4 mb-6">

					{/* Product dropdown */}
					<div className="flex flex-col gap-2">
						<label htmlFor="" className="">Product</label>
						<DropdownMenu>
							<DropdownMenuTrigger
								className="border px-5 py-2 rounded-md cursor-pointer bg-white flex justify-between items-center gap-8 disabled:cursor-not-allowed"
								disabled={!selectedCompany}
							>
								{newItem.productId ?
									productsData?.data?.find((p: ProductFetchInterface) => p.id === newItem.productId)?.name :
									"Select Product"}
								<ChevronDown className="w-5 h-5 mt-1" />
							</DropdownMenuTrigger>

							<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
								{productsData?.data?.map((prod: ProductFetchInterface) => (
									<DropdownMenuItem
										key={prod.id}
										onClick={() => {
											console.log("prod : ", prod);
											setNewItem(prev => ({
												...prev,
												productId: prod.id,
												price: prod.sellingPrice,
												subtotal: prev.quantity * prod.sellingPrice
											}));
											setSelectedProduct(prod);
										}}
									>
										{prod.name}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{/* Quantity */}
					<div className="flex flex-col gap-2">
						<label htmlFor="" className="">Quantity</label>
						<Input
							type="number"
							value={newItem.quantity}
							onChange={e =>
								setNewItem(prev => ({ ...prev, quantity: Number(e.target.value) }))
							}
							placeholder="Qty"
							className="w-24 bg-white"
						/>
					</div>

					{/* Price */}
					<div className="flex flex-col gap-2">
						<label htmlFor="" className="">Price</label>
						<Input
							type="number"
							value={newItem.price || selectedProduct?.sellingPrice || 0}
							onChange={e =>
								setNewItem(prev => ({
									...prev,
									price: Number(e.target.value),
									subtotal: prev.quantity * Number(e.target.value)
								}))
							}
							placeholder="Price"
							className="w-32 bg-white"
							disabled={!selectedProduct}
						/>
					</div>

					{/* Subtotal (calculated) */}
					<div className="flex flex-col gap-2">
						<label htmlFor="" className="">Sub Total</label>
						<div className=" w-fit bg-white py-1 border px-5 rounded-md">
							₹ {newItem.subtotal.toFixed(2)}
						</div>
					</div>

					<Button onClick={addOrderItem} className="mt-5">
						<Plus className="w-5 h-5" /> Add Item
					</Button>

					<div className="mt-5">
						<Button onClick={handleCreateOrder}>Create Order</Button>
					</div>
				</div>

				{/* Order Items Table */}
				<table className="w-full border mt-5">
					<thead className="bg-gray-100">
						<tr>
							<th className="p-2 border">Product</th>
							<th className="p-2 border">Qty</th>
							<th className="p-2 border">Price</th>
							<th className="p-2 border">Subtotal</th>
							<th className="p-2 border">Action</th>
						</tr>
					</thead>

					<tbody>
						{orderItems.map((item, index) => (
							<tr key={index}>
								<td className="p-2 border">
									{productsData?.data.find((p: ProductFetchInterface) => p.id === item.productId)?.name}
								</td>

								<td className="p-2 border">{item.quantity}</td>
								<td className="p-2 border">₹ {item.price}</td>
								<td className="p-2 border">₹ {item.subtotal.toFixed(2)}</td>

								<td className="p-2 border text-center flex gap-2 justify-center">
									<Button
										variant="outline"
										size="sm"
										onClick={() => {
											setNewItem(orderItems[index]);
											setEditIndex(index);
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}
									>
										Edit
									</Button>

									<Button
										variant="destructive"
										size="sm"
										onClick={() => removeItem(index)}
									>
										Remove
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

			</div>

		</div>
	);
};


export default AddOrder