import "./globals.css";
import { Comic_Neue } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Providers from "./provider";
import ReduxProvider from "./providers/ReduxProvider";

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
			<body className={`${comicNeue.variable} antialiased w-full bg-gray-50`}>
				<ReduxProvider>
					<Providers>{children}</Providers>
				</ReduxProvider>
			</body>
		</html>
	);
}
