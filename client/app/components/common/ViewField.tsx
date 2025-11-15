"use client"

import { FC } from "react";

// components/ViewField.tsx
interface ViewFieldProps {
	label: string;
	value: string | number | null | undefined;
	prefix?: string; // optional prefix like ₹
}

const ViewField: FC<ViewFieldProps> = ({ label, value, prefix }) => {
	return (
		<div className="flex flex-col gap-2">
			<p className="text-base font-semibold text-gray-600">{label}</p>
			<p className="text-base border rounded-md px-3 py-2">
				{prefix ? `${prefix} ` : ""}
				{value || "—"}
			</p>
		</div>
	);
};

export default ViewField;
