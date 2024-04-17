'use client';
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";


const ThemesProvider = ({ children} : { children: ReactNode}) => {
    return (
        <ThemeProvider
            // attribute="class"
            attribute = 'data-theme'
            defaultTheme='system'
            enableSystem
        >
            {children}
        </ThemeProvider>
    )
}
export default ThemesProvider;