const sectorFilter = document.querySelector('#filter-sector');
const geoFilter = document.querySelector('#filter-geo');
const apyFilter = document.querySelector('#filter-apy');
const apyValue = document.querySelector('#filter-apy-value');
const grid = document.querySelector('#deal-grid');
const modal = document.querySelector('#deal-modal');
const modalContent = document.querySelector('#modal-content');
const statApy = document.querySelector('#stat-apy');
const statLtv = document.querySelector('#stat-ltv');
const statTenor = document.querySelector('#stat-tenor');
const snippetsPath = 'assets/snippets.html';

const unique = (items, key) => Array.from(new Set(items.map((i) => i[key])));

function populateFilters() {
  unique(deals, 'sector').forEach((sector) => {
    const option = document.createElement('option');
    option.value = sector;
    option.textContent = sector;
    sectorFilter.appendChild(option);
  });

  unique(deals, 'geography').forEach((geo) => {
    const option = document.createElement('option');
    option.value = geo;
    option.textContent = geo;
    geoFilter.appendChild(option);
  });
}

function filteredDeals() {
  const minApy = Number(apyFilter.value);
  return deals.filter((deal) => {
    const sectorMatches = sectorFilter.value === 'all' || deal.sector === sectorFilter.value;
    const geoMatches = geoFilter.value === 'all' || deal.geography === geoFilter.value;
    const apyMatches = deal.targetApy >= minApy;
    return sectorMatches && geoMatches && apyMatches;
  });
}

function renderStats(items) {
  if (!items.length) return;
  const avgApy = items.reduce((sum, d) => sum + d.targetApy, 0) / items.length;
  const avgLtv = items.reduce((sum, d) => sum + d.ltv, 0) / items.length;
  const avgTenor = items.reduce((sum, d) => sum + d.tenorMonths, 0) / items.length;

  statApy.textContent = `${avgApy.toFixed(1)}%`;
  statLtv.textContent = `${avgLtv.toFixed(0)}%`;
  statTenor.textContent = `${avgTenor.toFixed(1)} mo`;
}

function renderDeals() {
  const items = filteredDeals();
  grid.innerHTML = '';

  if (!items.length) {
    grid.innerHTML = '<p class="muted">No deals match this filter. Try lowering the APY or clearing filters.</p>';
    return;
  }

  items.forEach((deal) => {
    const card = document.createElement('article');
    card.className = 'deal-card';
    card.innerHTML = `
      <div class="pill ${deal.status}">${deal.status}</div>
      <h3>${deal.title}</h3>
      <p class="muted">${deal.summary}</p>
      <dl class="metrics">
        <div><dt>Target APY</dt><dd>${deal.targetApy}%</dd></div>
        <div><dt>LTV</dt><dd>${deal.ltv}%</dd></div>
        <div><dt>Tenor</dt><dd>${deal.tenorMonths} mo</dd></div>
        <div><dt>Min ticket</dt><dd>${deal.minTicket}</dd></div>
      </dl>
      <div class="tags">
        <span>${deal.sector}</span>
        <span>${deal.geography}</span>
      </div>
      <button class="button ghost" data-slug="${deal.slug}">View details</button>
    `;
    card.querySelector('button').addEventListener('click', () => openDeal(deal.slug));
    grid.appendChild(card);
  });

  renderStats(items);
}

function openDeal(slug) {
  const deal = deals.find((d) => d.slug === slug);
  if (!deal) return;

  modalContent.innerHTML = `
    <div class="pill ${deal.status}">${deal.status}</div>
    <h2>${deal.title}</h2>
    <p>${deal.summary}</p>
    <dl class="metrics">
      <div><dt>Target APY</dt><dd>${deal.targetApy}%</dd></div>
      <div><dt>LTV</dt><dd>${deal.ltv}%</dd></div>
      <div><dt>Tenor</dt><dd>${deal.tenorMonths} months</dd></div>
      <div><dt>Minimum ticket</dt><dd>${deal.minTicket}</dd></div>
    </dl>
    <h3>Structure</h3>
    <p>${deal.structure}</p>
    <h3>Collateral</h3>
    <p>${deal.collateral}</p>
    <h3>Docs & media</h3>
    <ul class="links">
      ${deal.docs.map((doc) => `<li><a href="${doc.url}" target="_blank" rel="noreferrer">${doc.label}</a></li>`).join('')}
    </ul>
    <h3>Key risks</h3>
    <ul class="risks">
      ${deal.riskFlags.map((risk) => `<li>${risk}</li>`).join('')}
    </ul>
    <div class="modal-actions">
      <a class="button primary" href="${deal.callToActionUrl}" target="_blank" rel="noreferrer">Request allocation</a>
      <a class="button ghost" href="${deal.calendlyUrl}" target="_blank" rel="noreferrer">Book diligence call</a>
    </div>
    <p class="muted">Last updated: ${deal.lastUpdated}</p>
  `;

  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

function attachListeners() {
  [sectorFilter, geoFilter, apyFilter].forEach((input) => {
    input.addEventListener('input', () => {
      if (input === apyFilter) {
        apyValue.textContent = `${apyFilter.value}%+`;
      }
      renderDeals();
    });
  });

  modal.addEventListener('click', (event) => {
    if (event.target.dataset.close !== undefined || event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
}

function loadSnippets() {
  fetch(snippetsPath)
    .then((response) => response.text())
    .then((html) => {
      const template = document.createElement('template');
      template.innerHTML = html.trim();
      document.head.append(...template.content.childNodes);
    })
    .catch(() => {
      console.info('Optional analytics snippet not loaded.');
    });
}

populateFilters();
attachListeners();
renderDeals();
loadSnippets();
