// Light / dark theme. Load synchronously in <head> so the page never flashes.
// Light by default; a stored choice from the toggle wins. Exposes window.Theme for the
// toggles in variation-ide.jsx and the blog pages.
(function () {
  var KEY = "ved1beta:theme";
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function apply(theme) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f7f7f4" : "#0a0a0a");
    window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  }
  function current() { return root.dataset.theme || "light"; }
  function set(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    apply(theme);
  }
  function toggle() { set(current() === "light" ? "dark" : "light"); }

  apply(stored() || "light");

  window.Theme = { current: current, set: set, toggle: toggle };
})();
