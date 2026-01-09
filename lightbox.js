// EFGlassArt - shared lightbox behavior
// Usage: add data-lightbox and data-caption to <a href="fullsize.jpg">...</a>

(function () {
  // Keep footer year current (safe even if #year doesn't exist on some pages)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbCap = document.getElementById("lightboxCaption");
  const lbClose = document.getElementById("lightboxClose");

  // If a page doesn't include the lightbox markup, do nothing.
  if (!lb || !lbImg || !lbCap || !lbClose) return;

  function openLightbox(src, caption) {
    lbImg.src = src;
    lbCap.textContent = caption || "";
    lb.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lb.style.display = "none";
    lbImg.src = "";
    lbCap.textContent = "";
    document.body.style.overflow = "";
  }

  // Open when clicking any link with data-lightbox
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-lightbox]");
    if (!a) return;

    e.preventDefault();
    openLightbox(a.getAttribute("href"), a.getAttribute("data-caption"));
  });

  // Close handlers
  lbClose.addEventListener("click", closeLightbox);

  lb.addEventListener("click", (e) => {
    // Only close when clicking the overlay (not the image/panel)
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lb.style.display !== "none" && e.key === "Escape") closeLightbox();
  });
})();
