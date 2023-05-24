module.exports = {
  printWidth: 120,
  useTabs: true,
  singleQuote: true,
  trailingComma: "all",
  arrowParens: "avoid",
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindFunctions: ["cn", "tv", "tw"],
};
