import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
	title: "IMS Dashboard",
	description: "Inventory Management System Dashboard",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={`${geistSans.variable} ${geistMono.variable} antialiased  w-full`}>
			<SidebarProvider>
				<AppSidebar />
				<div>
					<SidebarTrigger />
				</div>

				<main className="w-full">
					<Toaster position="top-right" />
					{children}
				</main>
			</SidebarProvider>
		</div>
	);
}
