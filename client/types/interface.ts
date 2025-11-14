import { ColumnDef } from "@tanstack/react-table"

// ======================== PRODUCTS ========================
export interface ProductIntakeInterface {
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

export interface ProductFetchInterface {
	id: string
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
	createdAt: string
	updatedAt: string
	createdBy: string
	updatedBy: string
}

export interface ProductCardsInterface {
	count: number
	title: string
	color: string
}

export interface ProductInterface {
	product: ProductIntakeInterface
	//company: any
}

export interface EditProductInterface {
	product: ProductFetchInterface
	productId: string
}





// ======================== COMPANY ========================
export interface CompanyFetchInterface {
	id: string
	name: string
	emailId: string
	phoneNumber: string
	address: string
	gstin: string
	createdBy: string
}

export interface CompanyIntakeInterface {
	name: string
	emailId: string
	phoneNumber: string
	address: string
	gstin: string
	createdBy: string
}

export interface CompanyInterface {
	company: CompanyIntakeInterface
}

// ======================== DATA TABLE ========================
export interface DataTableProps<TData, TValue> {
	heading: string
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	filterColumn?: string // optional: which column to filter on
}