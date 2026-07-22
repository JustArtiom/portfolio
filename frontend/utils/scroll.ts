export const HEADER_OFFSET = 80;

export function scrollToId(id: string, offset = HEADER_OFFSET) {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}
