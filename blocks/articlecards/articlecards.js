export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    // cells[0] = image cell, cells[1] = text cell
    if (cells.length >= 2) {
      const textCell = cells[1];
      // Add an arrow link at the bottom of each card
      const titleLink = textCell.querySelector('h3 a');
      if (titleLink) {
        const arrowDiv = document.createElement('div');
        arrowDiv.className = 'card-arrow';
        const arrow = document.createElement('a');
        arrow.href = titleLink.href;
        arrow.setAttribute('aria-label', titleLink.textContent);
        arrow.innerHTML = '&#8594;';
        arrowDiv.appendChild(arrow);
        textCell.appendChild(arrowDiv);
      }
    }
  });
}
