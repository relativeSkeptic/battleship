import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import eslintRecommended from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["dist", "build", "node_modules"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        browser: "readonly",
        node: "readonly",
      },
    },

    plugins: { "@typescript-eslint": tsPlugin },

    rules: {
      ...eslintRecommended.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...prettier.rules,
    },
  },
];
