import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary:    'rgb(var(--c-primary)   / <alpha-value>)',
                secondary:  'rgb(var(--c-secondary) / <alpha-value>)',

                bg:         'rgb(var(--c-bg) / <alpha-value>)',
                tx:         'rgb(var(--c-tx) / <alpha-value>)',
                
                warning:    'rgb(var(--c-warning) / <alpha-value>)',
                error:      'rgb(var(--c-error)   / <alpha-value>)',
                success:    'rgb(var(--c-success) / <alpha-value>)',
                info:       'rgb(var(--c-info)    / <alpha-value>)'
            }
        },
    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: 'class'
        })
    ],
}

export default config
