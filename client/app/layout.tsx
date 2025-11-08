import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
	title: "IMS",
	description: "Inventory Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 w-full`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
