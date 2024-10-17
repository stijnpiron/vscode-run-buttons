const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const typescriptEslintEslintPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const eslintPluginUnusedImports = require("eslint-plugin-unused-imports");
const globals = require("globals");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  {
    files: ["**/*.ts"],
  },
  {
    plugins: {
      "@typescript-eslint": typescriptEslintEslintPlugin,
      "unused-imports": eslintPluginUnusedImports,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "es2023",
        sourceType: "module",
      },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    ...compat.config().map((config) => ({
      ...config,
      files: ["**/*.ts"],
      rules: {
        ...config.rules,
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/method-signature-style": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-empty-object-type": "warn",
        "@typescript-eslint/no-explicit-any": ["warn", { fixToUnknown: false }],
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            args: "after-used",
            argsIgnorePattern: "^_",
            vars: "all",
            varsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/no-use-before-define": "error",
        "@typescript-eslint/prefer-enum-initializers": "error",
        "arrow-parens": "error",
        "default-case-last": "error",
        eqeqeq: "error",
        indent: "off",
        "max-classes-per-file": ["error", 1],
        "max-len": "off",
        "max-lines": ["warn", 500],
        "multiline-comment-style": ["error", "separate-lines"],
        "no-console": ["error", { allow: ["error", "warn"] }],
        "no-empty-pattern": "warn",
        "no-duplicate-imports": "error",
        "no-empty": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-semi": "error",
        "no-floating-decimal": "error",
        "no-restricted-globals": "off",
        "no-underscore-dangle": "error",
        "no-use-before-define": "off",
        "no-useless-escape": "error",
        "no-var": "error",
        "prefer-const": "error",
        "prefer-template": "warn",
        semi: ["error", "always"],
        "semi-style": "error",
        "spaced-comment": "error",
        "unused-imports/no-unused-imports": "error",
      },
    })),
  },
];
