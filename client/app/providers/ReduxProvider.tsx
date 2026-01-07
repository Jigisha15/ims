"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "../store/store";
import { useEffect } from "react";
import { restoreAuth } from "../store/authSlice";

function AuthRestorer({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			dispatch(restoreAuth(token));
		}
	}, [dispatch]);

	return <>{children}</>;
}

export default function ReduxProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Provider store={store}>
			<AuthRestorer>{children}</AuthRestorer>
		</Provider>
	);
}
