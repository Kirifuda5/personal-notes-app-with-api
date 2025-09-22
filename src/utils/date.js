export function formatDateByLocale(date, locale = "id") {
  const lang = locale === "en" ? "en-US" : "id-ID";
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  try {
    return new Date(date).toLocaleDateString(lang, options);
  } catch {
    return new Date(date).toISOString().slice(0, 10);
  }
}
