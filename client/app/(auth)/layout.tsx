import { Comic_Neue } from "next/font/google";
import "../globals.css";

const comicNeue = Comic_Neue({
	subsets: ["latin"],
	weight: ["300", "400", "700"],
	variable: "--font-comic-neue",
})

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		//<div className="antialiased bg-gray-50 flex items-center justify-center min-h-screen">
		<div className={`${comicNeue.variable} antialiased w-full`}>
			{children}
		</div>
	);
}
