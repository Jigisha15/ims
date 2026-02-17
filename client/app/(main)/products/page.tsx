"use client"

import { useGetProducts } from "@/api/products/products-mutation"
import ProductCardComponent from "@/app/components/products/ProductCardComponent"
import ProductTable from "@/app/components/products/ProductTable"

const ProductsPage = () => {

	const { data, isLoading, error } = useGetProducts()

	if (isLoading) return <div>Loading...</div> // TODO: Replace with Skeleton
	if (error) return <div>Something went wrong</div>

	return (
		<div className="">
			<ProductCardComponent inStock={data.data.inStock} lowStock={data.data.lowStock} outOfStock={data.data.outOfStock} />
			<ProductTable data={data.data.products} />
		</div>
	)
}

export default ProductsPage