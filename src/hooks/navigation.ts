export function navigateTo(id: string, focus = false) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  if (focus) { element.setAttribute('tabindex', '-1'); element.focus({ preventScroll: true }); }
}
