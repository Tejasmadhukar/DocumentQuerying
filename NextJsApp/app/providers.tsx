"use client"

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

type Props = {
	children?: React.ReactNode;
};

export function Providers({ children, themeProps }: ProvidersProps) {
	const [queryClient] = React.useState(() => new QueryClient())
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<NextUIProvider>
					<NextThemesProvider {...themeProps}>
							{children}
					</NextThemesProvider>
				</NextUIProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
}
