"use client"

import React, { ChangeEvent, FC } from "react"
import { Input } from "@/components/ui/input"

interface InputFieldProps {
	label?: string
	name: string
	type?: string
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	className?: string
	containerClassName?: string
	placeholder?: string
	disabled?: boolean
}

const InputField: FC<InputFieldProps> = ({
	label,
	name,
	type = "text",
	value,
	onChange,
	className = "",
	containerClassName = "",
	placeholder = "",
	disabled = false,
}) => {
	return (
		<div className={`flex flex-col gap-2 w-full ${containerClassName}`}>
			{label && (
				<label
					htmlFor={name}
					className="text-base font-semibold text-gray-600 capitalize"
				>
					{label}
				</label>
			)}

			<Input
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				disabled={disabled}
				className={`border rounded-md px-2 py-1 text-base ${className}`}
			/>
		</div>
	)
}

export default InputField
