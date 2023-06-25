"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types"
import { SessionProvider } from "next-auth/react"

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

type Props = {
	children?: React.ReactNode;
};

export function Providers({ children, themeProps }: ProvidersProps) {
	return (
		<NextUIProvider>
			<NextThemesProvider {...themeProps}>
					{children}
			</NextThemesProvider>
		</NextUIProvider>
	);
}

export const NextAuthProvider = ({ children }: Props) => {
	return <SessionProvider>{children}</SessionProvider>;
};
  