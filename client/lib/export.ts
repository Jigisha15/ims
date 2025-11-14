import * as XLSX from "xlsx"
import { CompanyFetchInterface, ProductFetchInterface } from "@/types/interface"

interface ExcelExportProductsInterface {
	products?: ProductFetchInterface[],
	companies?: CompanyFetchInterface[],
	users?: any[],
	orders?: any[],
	purchase_orders?: any[],
	quotations?: any[],
	exportType: "Product" | "Company" | "Orders" | "Purchase_orders" | "Users" | "Quotations" | "All"
}

export const exportDataToExcel = ({ products, companies, users, exportType }: ExcelExportProductsInterface) => {
	// data to be entered into the excel sheet
	const sheetData: any[][] = []

	// write the column titles
	const headers: Record<string, string[]> = {
		Product: [
			"Id",
			"Name",
			"Description",
			"Model Number",
			"Category",
			"Cost Price",
			"Selling Price",
			"Stock Quantity",
			"Company Name",
			"Created By",
		],
		Company: [
			"Id",
			"Name",
			"Email",
			"Phone Number",
			"Address",
			"GSTIN",
			"Created By",
		],
		Orders: [],
		Purchase_orders: [],
		Users: [],
		Quotations: [],
	}

	// enter the column names
	sheetData.push(headers[exportType])

	// enter data into the sheet
	if (exportType === "Product") {
		products?.forEach(product => {
			const cmpn = companies?.find((c) => c.id === product.companyId)
			const user = users?.find((u) => u.id === product.createdBy)
			sheetData.push([
				product.id,
				product.name,
				product.description,
				product.modelNumber,
				product.category,
				product.costPrice,
				product.sellingPrice,
				product.stockQuantity,
				cmpn?.name,
				user?.name
			])
		})
	}

	if (exportType === "Company") {
		companies?.forEach(company => {
			const user = users?.find((u) => u.id === company.createdBy)
			sheetData.push([
				company.id,
				company.name,
				company.emailId,
				company.phoneNumber,
				company.address,
				company.gstin,
				user?.name
			])
		})
	}

	// convert data into worksheet
	const worksheet = XLSX.utils.aoa_to_sheet(sheetData)

	// create a workbook
	const workbook = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(workbook, worksheet, exportType)

	// download the file
	XLSX.writeFile(workbook, `${exportType}.xlsx`)
}