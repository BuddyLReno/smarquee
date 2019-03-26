export function buildStyle(id, margin) {
  let style = `
  .Smarquee--${id} {
    overflow: hidden;
    white-space: nowrap;
  }

  .Smarquee--${id} [data-smarquee-scroll-title] {
    margin-left: ${margin}px;
  }
`;
  return style;
}
