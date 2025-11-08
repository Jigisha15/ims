import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Geist, Geist_Mono, Comic_Neue } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const comicNeue = Comic_Neue({
	subsets: ["latin"],
	weight: ["300", "400", "700"],
	variable: "--font-comic-neue",
});

export const metadata = {
	title: "IMS",
	description: "Inventory Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			{/*<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 w-full`}>*/}
			<body className={`${comicNeue.variable} antialiased w-full bg-gray-50`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
