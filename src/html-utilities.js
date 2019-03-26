export function createScrollTitle(contentToInsert, container) {
  const scrollContent = `<div data-smarquee-scroll-wrapper>${contentToInsert}<span data-smarquee-scroll-title>${contentToInsert}</span></div>`;

  container.innerHTML = scrollContent;

  return container.querySelector('[data-smarquee-scroll-wrapper]');
}

export function appendStyleBlock(styles, id) {
  let styleBlock = document.createElement('style');
  styleBlock.id = id;
  styleBlock.appendChild(document.createTextNode(styles));
  document.head.appendChild(styleBlock);
  return document.head.querySelector(`#${id}`);
}
