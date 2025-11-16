import { ColumnDef } from "@tanstack/react-table"

// ======================== PRODUCTS ========================
export interface ProductIntakeInterface {
	name: string
	description: string
	modelNumber: string
	categoryId: string
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
	costPrice: number
	sellingPrice: number
	stockQuantity: number
	minimumQuantity: number
	imageUrl: string
	createdAt: string
	updatedAt: string
	createdBy: string
	updatedBy: string
	companyId: string
	company: any
	category: { id: string, name: string }
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





// ======================== CATEGORY ========================
export interface CategoryFetchInterface {
	id: string
	name: string
	products: ProductFetchInterface[]
}

export interface CategoryIntakeInterface {
	name: string
	products: ProductIntakeInterface[]
}





// ======================== CUSTOMER ========================
export interface CustomerFetchInterface {
	id: string
	name: string
	emailId: string
	phoneNumber: string
	address: string
	role: string
	createdBy: string
	updatedBy: string
	createdAt: string
	updatedAt: string
	companyId: string
}

export interface CustomerIntakeInterface {
	name: string
	emailId: string
	phoneNumber: string
	address: string
	role: string
	companyId: string
	createdBy: string
}








// ======================== SUPPLIERS ========================
export interface SupplierFetchInterface {
	id: string
	name: string
	emailId: string
	phoneNumber: string
	role: string
	createdAt: string
	updatedAt: string
	companyId: string
}

export interface SupplierIntakeInterface {
	name: string
	emailId: string
	phoneNumber: string
	role: string
	companyId: string
}





// ======================== DATA TABLE ========================
export interface DataTableProps<TData, TValue> {
	heading: string
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	filterColumn?: string // optional: which column to filter on
}