export default async function decorate(block) {
  const rows = [...block.children];

  const featuredCards = [];
  const compactCards = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells[0];
    const contentCell = cells[1];
    const typeCell = cells[2];

    const type = typeCell?.textContent.trim().toLowerCase() || 'featured';

    // Build card data
    const icon = iconCell?.querySelector('.icon');
    const heading = contentCell?.querySelector('h3');
    const paragraphs = [...(contentCell?.querySelectorAll('p') || [])];

    if (type === 'featured') {
      // Featured card: icon, h3, description, button (CTA), secondary link
      const card = document.createElement('div');
      card.className = 'featured-card';

      // Icon
      if (icon) {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'card-icon';
        iconDiv.appendChild(icon.cloneNode(true));
        card.appendChild(iconDiv);
      }

      // Heading
      if (heading) {
        card.appendChild(heading.cloneNode(true));
      }

      // Description (first p without a link being the only content)
      paragraphs.forEach((p) => {
        const links = p.querySelectorAll('a');
        const isButtonWrapper = p.classList.contains('button-wrapper');
        const hasOnlyLink = links.length === 1 && p.textContent.trim() === links[0].textContent.trim();

        if (isButtonWrapper) {
          // This is the primary CTA button
          card.appendChild(p.cloneNode(true));
        } else if (hasOnlyLink && !isButtonWrapper) {
          // This is the secondary link (PDF)
          const linkDiv = document.createElement('div');
          linkDiv.className = 'card-secondary-link';
          linkDiv.appendChild(p.cloneNode(true));
          card.appendChild(linkDiv);
        } else {
          // Regular paragraph (description)
          card.appendChild(p.cloneNode(true));
        }
      });

      featuredCards.push(card);
    } else {
      // Compact card: icon, h3, link
      const card = document.createElement('div');
      card.className = 'compact-card';

      if (icon) {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'card-icon';
        iconDiv.appendChild(icon.cloneNode(true));
        card.appendChild(iconDiv);
      }

      if (heading) {
        card.appendChild(heading.cloneNode(true));
      }

      // Link paragraph
      paragraphs.forEach((p) => {
        card.appendChild(p.cloneNode(true));
      });

      compactCards.push(card);
    }
  });

  // Clear block and rebuild
  block.textContent = '';

  // Featured row
  if (featuredCards.length > 0) {
    const featuredRow = document.createElement('div');
    featuredRow.className = 'featured-row';
    featuredCards.forEach((card) => featuredRow.appendChild(card));
    block.appendChild(featuredRow);
  }

  // Compact row
  if (compactCards.length > 0) {
    const compactRow = document.createElement('div');
    compactRow.className = 'compact-row';
    compactCards.forEach((card) => compactRow.appendChild(card));
    block.appendChild(compactRow);
  }
}
