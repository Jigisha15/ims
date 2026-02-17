import { ColumnDef } from "@tanstack/react-table"
import { ORDER_STATUS } from "./enum"


// ======================== AUTH ========================
export interface RegisterInterface {
	name: string
	emailId: string
	phoneNumber: string
	password: string
	role: string
}

export interface LoginInterface {
	emailId: string
	password: string
}

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

export interface ProductInterface {
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
	company: CompanyPFetchInterface
	categoryId: string
	category: { id: string, name: string }
}


export interface ProductFetchCatInterface {
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
	categoryId: string
}

export interface ProductFetchInterface {
	products: ProductInterface,
	inStock: number,
	lowStock: number,
	outOfStock: number
}

export interface ProductCardsInterface {
	count: number
	title: string
	color: string
}

//export interface ProductInterface {
//	product: ProductIntakeInterface
//	//company: any
//}

export interface EditProductInterface {
	product: ProductInterface
	//product: ProductFetchInterface
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

export interface CompanyPFetchInterface {
	id: string
	name: string
	emailId: string
	phoneNumber: string
	address: string
	gstin: string
	createdAt: string
	updatedBy: string
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
	products: ProductFetchCatInterface[]
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






// ======================== ORDERS & ORDER ITEMS ========================
export interface OrderItemsIntakInterface {
	productId: string
	quantity: number
	price: number
	subtotal: number
}

export interface OrderItemsFetchInterface {
	id: string;
	quantity: number;
	price: number;
	subtotal: number;
	orderId: string;
	productId: string;
	//order?: any;    // or OrderFetchInterface if you have it
	//product?: any;  // or ProductFetchInterface if available
}

export interface OrderFetchInterface {
	id: string;
	orderNo: string;
	dateOrdered: Date;
	status: ORDER_STATUS;
	totalAmount: number;
	createdAt: Date;
	updatedAt: Date;
	companyId: string;
	customerId: string;

	//// Optional: relations (can be typed more strongly if needed)
	//company?: any;
	//customer?: any;
	//orderItems?: any[];
	//payments?: any[];
}

export interface OrderIntakeInterface {
	companyId: string
	customerId: string
	totalAmount: number
	status: ORDER_STATUS
	orderItems: OrderItemsIntakInterface[]
}


// ======================== DATA TABLE ========================
export interface DataTableProps<TData, TValue> {
	heading: string
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	filterColumn?: string // optional: which column to filter on
}