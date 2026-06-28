// JavaScript to toggle the "scrolled" class based on scroll position
document.addEventListener("scroll", () => {
    const header = document.querySelector(".custom-header");
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

// Auto-resize bd-iframe to match booking app content height (no scroll)
window.addEventListener('message', (e) => {
  if (e.data?.type !== 'bd-iframe-height') return;
  document.querySelectorAll('.bd-iframe').forEach((iframe) => {
    iframe.style.height = e.data.height + 'px';
  });
});

// Delay home-hero video playback by 5 seconds
document.addEventListener("DOMContentLoaded", () => {
    const heroVideo = document.querySelector(".home-hero video");
    if (heroVideo) {
      heroVideo.pause();
      setTimeout(() => {
        heroVideo.play();
      }, 5000);
    }
  });
