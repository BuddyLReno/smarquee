export function createScrollTitle(contentToInsert, container) {
  const scrollContent = `<span data-smarquee-scroll-wrapper>${contentToInsert}<span data-smarquee-scroll-title>${contentToInsert}</span></span>`;

  container.innerHTML = scrollContent;

  return container.querySelector('[data-smarquee-scroll-wrapper]');
}
