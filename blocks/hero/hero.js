export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const row = rows[0];
  const cells = [...row.children];

  // Cell 0: background image, Cell 1: text content
  const imageCell = cells[0];
  const textCell = cells[1];

  // Create background container
  const bgDiv = document.createElement('div');
  bgDiv.className = 'hero-bg';
  const picture = imageCell.querySelector('picture');
  if (picture) {
    bgDiv.appendChild(picture);
  }

  // Create content container
  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-content';

  // Move heading (any level — the hero headline is the page's <h1>)
  const heading = textCell.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    contentDiv.appendChild(heading);
  }

  // Process remaining paragraphs
  const paragraphs = [...textCell.querySelectorAll('p')];
  paragraphs.forEach((p, index) => {
    // Check if this is a button paragraph
    const buttonLink = p.querySelector('a.button');
    if (buttonLink) {
      contentDiv.appendChild(p);
    } else if (index === 0) {
      // First paragraph = subheading
      p.className = 'hero-subheading';
      contentDiv.appendChild(p);
    } else {
      // Remaining = fine print
      p.className = 'hero-fine-print';
      contentDiv.appendChild(p);
    }
  });

  // Clear block and rebuild
  block.textContent = '';
  block.appendChild(bgDiv);
  block.appendChild(contentDiv);
}
