import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
    // =========================
    // GLOBAL IGNORES
    // =========================
    {
        ignores: [
            "dist/**",
            "backend/**"
        ],
    },

    // =========================
    // BASE JS + TS RULES (FRONTEND ONLY)
    // =========================
    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ["src/**/*.{ts,tsx,js,jsx}"],

        languageOptions: {
            globals: globals.browser,
        },
    },

    // =========================
    // REACT PLUGINS (FRONTEND ONLY)
    // =========================
    {
        files: ["src/**/*.{ts,tsx,jsx}"],

        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },

        rules: {
            ...reactHooks.configs.recommended.rules,

            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
        },
    },
);