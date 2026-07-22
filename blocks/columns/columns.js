export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      // Mark image cells for CSS targeting
      const pic = cell.querySelector('picture');
      if (pic) {
        cell.classList.add('columns-image');
      } else {
        cell.classList.add('columns-text');
      }
    });
  });
}
