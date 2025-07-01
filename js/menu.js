(() => {
  const menuBtnRefs = document.querySelectorAll("[data-menu-button]");
  const mobileMenuRef = document.querySelector("[data-menu]");
  const mobileMenuScroll = document.body;

  if (!menuBtnRefs.length || !mobileMenuRef) return;

  menuBtnRefs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = mobileMenuRef.classList.contains("is-open");
      menuBtnRefs.forEach((b) =>
        b.setAttribute("aria-expanded", String(!expanded))
      );
      mobileMenuRef.classList.toggle("is-open");
      mobileMenuScroll.classList.toggle("no-scroll");
    });
  });
})();
