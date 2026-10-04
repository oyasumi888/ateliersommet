// Applies the saved theme before first paint to avoid a flash of the wrong theme.
// Kept as a file (not inline) so the Content-Security-Policy can forbid inline scripts.
try {
  const t = localStorage.getItem('theme')
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t
} catch {
  /* storage unavailable */
}
