import type { Metadata } from "next";
import { Geist, Geist_Mono, Comic_Neue } from "next/font/google";
import "../globals.css";

import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/common/Sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
//const comicNeue = Comic_Neue({ variable: "--font-comic-neue", subsets: ["latin"] });
const comicNeue = Comic_Neue({
	subsets: ["latin"],
	weight: ["300", "400", "700"],
	variable: "--font-comic-neue",
});

export const metadata: Metadata = {
	title: "IMS Dashboard",
	description: "Inventory Management System Dashboard",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full h-screen flex overflow-hidden">
			<AppSidebar />

			<main className="flex-1 overflow-y-auto px-5">
				<Toaster position="top-right" />
				{children}
			</main>
		</div>
	);
}
