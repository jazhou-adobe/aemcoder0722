export default async function decorate(block) {
  // Each row is a category column with two cells:
  // Cell 1: icon + category heading link
  // Cell 2: list of sub-links
  const rows = [...block.children];
  rows.forEach((row) => {
    row.setAttribute('role', 'group');
  });
}
