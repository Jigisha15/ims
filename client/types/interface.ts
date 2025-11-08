import { ColumnDef } from "@tanstack/react-table"

// PRODUCTS
export interface Product {
	name: string
	description: string
	modelNumber: string
	category: string
	costPrice: number
	sellingPrice: number
	stockQuantity: number
	minimumQuantity: number
	imageUrl: string
	companyId: string
	createdBy: string
}

export interface ProductCardsInterface {
	count: number
	title: string
	color: string
}


// DATA TABLE
export interface DataTableProps<TData, TValue> {
	heading: string
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	filterColumn?: string // optional: which column to filter on
}