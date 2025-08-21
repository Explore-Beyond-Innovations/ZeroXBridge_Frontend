module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    localeDetection: true,
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./app/locales")
      : "/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
