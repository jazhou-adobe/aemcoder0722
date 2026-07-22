export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const iconCell = cells[0];
      const textCell = cells[1];
      // Find the link in text cell
      const link = textCell.querySelector('a');
      if (link) {
        // Make entire row act as clickable item
        row.addEventListener('click', () => {
          window.location.href = link.href;
        });
        row.style.cursor = 'pointer';
        row.setAttribute('role', 'link');
        row.setAttribute('aria-label', link.textContent.trim());
      }
    }
  });
}
