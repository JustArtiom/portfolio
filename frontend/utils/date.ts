import dateFormat from "dateformat";

// Dates come from date-only strings, which parse as UTC midnight. Formatting
// in UTC with a fixed mask (not the browser's locale data, which differs, e.g.
// "Sep" vs "Sept") gives every visitor exactly the prerendered text, so
// hydration never mismatches.
const MONTH_YEAR_UTC = "UTC:mmm yyyy";
const DAY_MONTH_YEAR_UTC = "UTC:d mmm yyyy";

/** e.g. "Sep 2023" */
export function formatMonthYear(date: Date | string): string {
  return dateFormat(date, MONTH_YEAR_UTC);
}

/** e.g. "21 Jun 2026" */
export function formatDayMonthYear(date: Date | string): string {
  return dateFormat(date, DAY_MONTH_YEAR_UTC);
}
