export default async function decorate(block) {
  const rows = [...block.children];

  // Create a flex container for the brand tiles
  const grid = document.createElement('div');
  grid.classList.add('brands-grid');

  rows.forEach((row) => {
    const cells = [...row.children];
    const tile = document.createElement('div');
    tile.classList.add('brands-tile');

    // Cell 0: image, Cell 1: link
    const imgCell = cells[0];
    const linkCell = cells[1];

    const img = imgCell?.querySelector('img');
    const link = linkCell?.querySelector('a');

    if (link && img) {
      // Wrap the image in the link
      const a = document.createElement('a');
      a.href = link.href;
      a.title = link.textContent || img.alt;
      a.appendChild(img);
      tile.appendChild(a);
    } else if (img) {
      tile.appendChild(img);
    }

    grid.appendChild(tile);
  });

  block.textContent = '';
  block.appendChild(grid);
}
