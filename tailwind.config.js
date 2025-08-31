/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}", // include all Meku.dev components and pages
        "./node_modules/@radix-ui/themes/**/*.css" // if you use Radix UI
    ],
    theme: { extend: {} },
    plugins: [],
};
