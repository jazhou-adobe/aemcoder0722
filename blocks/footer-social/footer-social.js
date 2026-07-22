export default async function decorate(block) {
  // Find the brands section (second cell in the row)
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      // Second cell is the brands section
      const brandsCell = cells[1];
      brandsCell.classList.add('brands');
      // The brand logos are authored as flat <p><a><picture> after the <h2>.
      // Wrap them in a flex row container.
      const logoPs = [...brandsCell.querySelectorAll(':scope > p')];
      if (logoPs.length) {
        const wrap = document.createElement('div');
        wrap.className = 'footer-brands';
        logoPs.forEach((p) => wrap.appendChild(p));
        brandsCell.appendChild(wrap);
      }
    }
  });
}
