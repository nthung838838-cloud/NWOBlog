// Theme toggle for NWO Blog (shared)
// Uses stylesheet swap to keep compatibility with existing CSS files.
(function(){
  const themes = { dark: "styles/app.css", light: "styles/app-light.css" };

  function getTheme(){
    try { return localStorage.getItem("theme") || "dark"; } catch(e){ return "dark"; }
  }
  function setTheme(t){
    const sheet = document.getElementById("themeStylesheet");
    if (sheet) sheet.href = themes[t] || themes.dark;
    try { localStorage.setItem("theme", t); } catch(e){}
    document.documentElement.setAttribute("data-theme", t);
  }
  function toggleTheme(){
    const cur = getTheme();
    setTheme(cur === "dark" ? "light" : "dark");
  }

  // Expose for inline onclick safety
  window.__setTheme = setTheme;
  window.__toggleTheme = toggleTheme;

  document.addEventListener("DOMContentLoaded", function(){
    const btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", function(e){
        e.preventDefault();
        toggleTheme();
      });
    }
    setTheme(getTheme());
  });
})(); 
