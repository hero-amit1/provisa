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
            // Avoid tsconfigRootDir ambiguity when multiple tsconfig roots exist
            // (e.g. /home/dell/provisa and /home/dell/provisa/frontend)
            parserOptions: {
                // Fix tsconfigRootDir ambiguity only; avoid forcing `project` which can break parsing
                // when ESLint cannot map all files to the provided TS project.
                tsconfigRootDir: new URL("./", import.meta.url).pathname,
            },
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