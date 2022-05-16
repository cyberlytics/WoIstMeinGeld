import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig({
    plugins: [react(), checker({ typescript: true })],
    server: {
        open: true,
        host: true,
        port: 3000,
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./node_modules/@testing-library/jest-dom/extend-expect",
    },
});
