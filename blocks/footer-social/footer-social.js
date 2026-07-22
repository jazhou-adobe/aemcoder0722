export default async function decorate(block) {
  // Find the brands section (second cell in the row)
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      // Second cell is the brands section
      cells[1].classList.add('brands');
    }
  });
}
