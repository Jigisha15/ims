"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

import { Provider as ReduxProvider } from "react-redux"
import { store } from "./store/store";

export default function Providers({ children }: { children: React.ReactNode }) {
	// React Query must be initialized client-side
	const [queryClient] = useState(() => new QueryClient());

	return (
		//<ReduxProvider store={store}>
		<QueryClientProvider client={queryClient}>
			{children}
			<Toaster position="top-center" />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
		//</ReduxProvider>
	);
}
