import nextConfig from "eslint-config-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["**/*.cjs", "**/*.js", "**/*.mjs", "src/graphql/generated/*"],
  },
  ...nextConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...tseslint.configs["strict-type-checked"].rules,
      ...tseslint.configs["stylistic-type-checked"].rules,
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "no-constant-binary-expression": "warn",
      "no-implicit-coercion": "error",
      "no-unneeded-ternary": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];
