const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const app = document.getElementById('app');
const splash = document.getElementById('splash');
const skipSplash = splash.querySelector('.skip');
const galleryGrid = document.getElementById('galleryGrid');
const loadMoreBtn = document.getElementById('loadMore');
const segments = document.querySelectorAll('.segment');
const views = document.querySelectorAll('.view');
const tabButtons = document.querySelectorAll('.tab-button');
const header = document.querySelector('.app-header');
const pullRefresh = document.querySelector('.pull-refresh');
const detailSheet = document.getElementById('detailSheet');
const detailImage = document.getElementById('detailImage');
const detailTitle = document.getElementById('detailTitle');
const detailPrice = document.getElementById('detailPrice');
const sheetVariations = document.getElementById('sheetVariations');
const addToBagBtn = document.getElementById('addToBag');
const toggleFavoriteBtn = document.getElementById('toggleFavorite');
const shareItemBtn = document.getElementById('shareItem');
const sheetCloseBtn = detailSheet.querySelector('.sheet-close');
const aiList = document.getElementById('aiList');
const infoButton = detailSheet.querySelector('.info-button');
const toast = document.getElementById('toast');
const peek = document.getElementById('peek');
const peekImage = document.getElementById('peekImage');
const peekTitle = document.getElementById('peekTitle');
const peekPrice = document.getElementById('peekPrice');
const favoritesGrid = document.getElementById('favoritesGrid');
const bagItems = document.getElementById('bagItems');
const bagTotal = document.getElementById('bagTotal');
const bagEmpty = document.getElementById('bagEmpty');
const bagFooter = document.getElementById('bagFooter');
const openVisualTry = document.getElementById('openVisualTry');
const visualModal = document.getElementById('visualModal');
const visualClose = document.querySelector('.visual-close');
const roomUpload = document.getElementById('roomUpload');
const beforeImage = document.getElementById('beforeImage');
const afterImage = document.getElementById('afterImage');
const previewSlider = document.getElementById('previewSlider');
const previewVisual = document.getElementById('previewVisual');
const resetVisual = document.getElementById('resetVisual');
const saveVisual = document.getElementById('saveVisual');
const scaleRange = document.getElementById('scaleRange');
const rotationRange = document.getElementById('rotationRange');
const visualSteps = document.querySelectorAll('.visual-steps .step');
const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestionsList');
const recentList = document.getElementById('recentList');
const clearHistory = document.querySelector('.clear-history');
const collectionsList = document.getElementById('collectionsList');
const bagView = document.getElementById('bagView');
const galleryView = document.getElementById('galleryView');
const backButton = document.querySelector('.back-button');
const headerTitle = document.querySelector('.page-title');
let sheetDragStart = null;
let sheetDragging = false;

const state = {
  filter: 'all',
  favorites: new Set(),
  bag: new Map(),
  activeItem: null,
  galleryPage: 1,
  recentSearches: [],
  currentView: 'galleryView'
};

const galleryData = [
  { id: 'sofa-1', title: 'أريكة سحابة', price: '2,950 ر.س', category: 'new', tags: ['soft', 'modern'], image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=800&q=80&fm=webp' },
  { id: 'chair-1', title: 'كرسي منحوت', price: '1,150 ر.س', category: 'popular', tags: ['art'], image: 'https://images.unsplash.com/photo-1600585154340-0ef3c08dcdb6?auto=format&fit=crop&w=700&q=80&fm=webp' },
  { id: 'lamp-1', title: 'مصباح هادئ', price: '680 ر.س', category: 'new', tags: ['light'], image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=700&q=80&fm=webp' },
  { id: 'table-1', title: 'طاولة قمر', price: '1,890 ر.س', category: 'popular', tags: ['table'], image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=700&q=80&fm=webp' },
  { id: 'decor-1', title: 'مزهرية قطرة', price: '240 ر.س', category: 'all', tags: ['decor'], image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=700&q=80&fm=webp' },
  { id: 'bed-1', title: 'سرير سكون', price: '3,450 ر.س', category: 'popular', tags: ['bedroom'], image: 'https://images.unsplash.com/photo-1616594039964-1967f1b01cad?auto=format&fit=crop&w=800&q=80&fm=webp' },
  { id: 'shelf-1', title: 'رف توازن', price: '760 ر.س', category: 'new', tags: ['storage'], image: 'https://images.unsplash.com/photo-1558211583-d26f610c69a0?auto=format&fit=crop&w=700&q=80&fm=webp' },
  { id: 'art-1', title: 'لوحة ضباب', price: '520 ر.س', category: 'all', tags: ['art'], image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80&fm=webp' },
  { id: 'mirror-1', title: 'مرآة قوس', price: '890 ر.س', category: 'popular', tags: ['mirror'], image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=700&q=80&fm=webp' }
];

const collectionData = [
  {
    id: 'calm-collection',
    title: 'هدوء',
    description: 'ألوان محايدة ولمسات ذهبية.',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80&fm=webp'
  },
  {
    id: 'bold-collection',
    title: 'جرأة',
    description: 'أشكال منحوتة ومواد فاخرة.',
    image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=900&q=80&fm=webp'
  },
  {
    id: 'light-collection',
    title: 'إضاءة',
    description: 'مصابيح هادئة وناعمة.',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=900&q=80&fm=webp'
  }
];

const suggestionData = [
  { id: 'sg-1', text: 'أرائك محايدة', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80&fm=webp' },
  { id: 'sg-2', text: 'إضاءات ناعمة', image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=400&q=80&fm=webp' },
  { id: 'sg-3', text: 'طاولات رخامي', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80&fm=webp' }
];

const aiFallback = (item) => galleryData.filter(g => g.category === item.category || item.tags.some(t => g.tags.includes(t))).slice(0, 5);

function initSplash() {
  const seen = localStorage.getItem('royal_splash_seen');
  if (seen) {
    hideSplash();
    return;
  }
  setTimeout(() => skipSplash.classList.add('show'), 800);
  let timer = setTimeout(() => hideSplash(true), prefersReducedMotion ? 200 : 2000);
  skipSplash.addEventListener('click', () => {
    clearTimeout(timer);
    hideSplash(true);
  });
}

function hideSplash(markSeen = false) {
  if (markSeen) {
    localStorage.setItem('royal_splash_seen', '1');
  }
  splash.setAttribute('hidden', '');
  app.hidden = false;
  requestAnimationFrame(() => app.classList.add('ready'));
}

function renderGallery(reset = false) {
  const filtered = galleryData.filter(item => state.filter === 'all' || item.category === state.filter);
  const items = filtered.slice(0, state.galleryPage * 6);
  if (reset) {
    galleryGrid.innerHTML = '';
  }
  items.forEach(item => {
    if (galleryGrid.querySelector(`[data-id="${item.id}"]`)) return;
    const card = document.createElement('article');
    card.className = 'gallery-card';
    card.tabIndex = 0;
    card.dataset.id = item.id;
    card.dataset.category = item.category;
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="card-overlay">
        <div class="card-actions">
          <button class="icon-button" data-action="bag" aria-label="أضف إلى الحقيبة">＋</button>
          <button class="icon-button" data-action="fav" aria-label="أضف للمفضلة">♡</button>
          <button class="icon-button" data-action="more" aria-label="خيارات">⋯</button>
        </div>
      </div>`;
    attachCardEvents(card, item);
    galleryGrid.appendChild(card);
  });
  loadMoreBtn.hidden = items.length >= filtered.length;
}

function attachCardEvents(card, item) {
  let pressTimer;
  let pointerDown = false;

  const clearTimer = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  };

  card.addEventListener('pointerenter', () => {
    card.classList.add('active-overlay');
  });
  card.addEventListener('pointerleave', () => {
    card.classList.remove('active-overlay');
    pointerDown = false;
    clearTimer();
  });

  card.addEventListener('pointerdown', (event) => {
    pointerDown = true;
    pressTimer = setTimeout(() => {
      if (pointerDown) {
        openPeek(item, event.clientX, event.clientY);
      }
      pressTimer = null;
    }, 420);
  });

  card.addEventListener('pointerup', (event) => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      if (!event.target.dataset.action) {
        openDetail(item);
      }
    }
    pointerDown = false;
    pressTimer = null;
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDetail(item);
    }
  });

  card.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    if (!action) return;
    e.stopPropagation();
    if (action === 'bag') {
      addToBag(item);
      showToast('أضيفت إلى الحقيبة');
    } else if (action === 'fav') {
      toggleFavorite(item);
      showToast('حُفظت في المفضلة');
    }
  });
}

function openPeek(item, x, y) {
  peekImage.src = item.image;
  peekTitle.textContent = item.title;
  peekPrice.textContent = item.price;
  peek.dataset.id = item.id;
  peek.classList.add('open');
  peek.style.setProperty('--x', `${x}px`);
  peek.style.setProperty('--y', `${y}px`);
}

peek.addEventListener('click', (event) => {
  const action = event.target.dataset.action;
  if (action === 'bag') {
    const item = galleryData.find(g => g.id === peek.dataset.id);
    if (item) addToBag(item);
    showToast('أضيفت إلى الحقيبة');
  }
  if (action === 'fav') {
    const item = galleryData.find(g => g.id === peek.dataset.id);
    if (item) toggleFavorite(item);
    showToast('حُفظت في المفضلة');
  }
  if (!event.target.dataset.action) {
    const item = galleryData.find(g => g.id === peek.dataset.id);
    if (item) openDetail(item);
  }
  closePeek();
});

function closePeek() {
  peek.classList.remove('open');
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePeek();
    closeDetail();
    closeVisualModal();
  }
});

detailSheet.addEventListener('click', (event) => {
  if (event.target === detailSheet) {
    closeDetail();
  }
});

detailSheet.addEventListener('pointerdown', (event) => {
  if (!detailSheet.classList.contains('open')) return;
  if (!event.target.closest('.sheet-body')) return;
  sheetDragging = true;
  sheetDragStart = event.clientY;
  detailSheet.style.transition = 'none';
});

detailSheet.addEventListener('pointermove', (event) => {
  if (!sheetDragging) return;
  const delta = event.clientY - sheetDragStart;
  if (delta > 0) {
    detailSheet.style.transform = `translateY(${Math.min(delta, 320)}px)`;
  }
});

const endSheetDrag = (event) => {
  if (!sheetDragging) return;
  detailSheet.style.transition = '';
  const delta = event.clientY - sheetDragStart;
  sheetDragging = false;
  sheetDragStart = null;
  if (delta > 120) {
    closeDetail();
  } else {
    detailSheet.style.transform = 'translateY(0)';
  }
};

detailSheet.addEventListener('pointerup', endSheetDrag);
detailSheet.addEventListener('pointercancel', endSheetDrag);

sheetCloseBtn.addEventListener('click', closeDetail);

function openDetail(item) {
  state.activeItem = item;
  detailImage.src = item.image;
  detailImage.alt = item.title;
  detailTitle.textContent = item.title;
  detailPrice.textContent = item.price;
  sheetVariations.innerHTML = item.tags
    .map(tag => `<button class="variation" type="button">${tag}</button>`)
    .join('');
  const favored = state.favorites.has(item.id);
  toggleFavoriteBtn.textContent = favored ? '♥' : '♡';
  toggleFavoriteBtn.classList.toggle('active', favored);
  detailSheet.style.transform = '';
  detailSheet.classList.add('open');
  detailSheet.setAttribute('aria-hidden', 'false');
  loadAISuggestions(item);
}

function closeDetail() {
  detailSheet.classList.remove('open');
  detailSheet.setAttribute('aria-hidden', 'true');
  detailSheet.style.transform = '';
  sheetDragging = false;
  sheetDragStart = null;
}

addToBagBtn.addEventListener('click', () => {
  if (state.activeItem) {
    addToBag(state.activeItem);
    showToast('أضيفت إلى الحقيبة');
  }
});

toggleFavoriteBtn.addEventListener('click', () => {
  if (state.activeItem) {
    toggleFavorite(state.activeItem);
    showToast('تم التحديث');
  }
});

shareItemBtn.addEventListener('click', async () => {
  if (!state.activeItem) return;
  const data = {
    title: state.activeItem.title,
    text: `شاهِد ${state.activeItem.title} الآن`,
    url: location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(data);
      showToast('تمت المشاركة');
    } else {
      await navigator.clipboard.writeText(`${data.text} - ${data.url}`);
      showToast('نُسخت المشاركة');
    }
  } catch (error) {
    showToast('تعذّر المشاركة');
  }
});

function toggleFavorite(item) {
  if (state.favorites.has(item.id)) {
    state.favorites.delete(item.id);
  } else {
    state.favorites.add(item.id);
  }
  if (state.activeItem?.id === item.id) {
    const favored = state.favorites.has(item.id);
    toggleFavoriteBtn.textContent = favored ? '♥' : '♡';
    toggleFavoriteBtn.classList.toggle('active', favored);
  }
  renderFavorites();
}

function renderFavorites() {
  favoritesGrid.innerHTML = '';
  if (!state.favorites.size) {
    favoritesGrid.innerHTML = '<p class="bag-empty">لا عناصر بعد.</p>';
    return;
  }
  state.favorites.forEach(id => {
    const item = galleryData.find(g => g.id === id);
    if (!item) return;
    const card = document.createElement('article');
    card.className = 'gallery-card';
    card.innerHTML = `<img src="${item.image}" alt="${item.title}" loading="lazy">`;
    card.addEventListener('click', () => openDetail(item));
    favoritesGrid.appendChild(card);
  });
}

function addToBag(item) {
  const entry = state.bag.get(item.id) || { ...item, quantity: 0 };
  entry.quantity += 1;
  state.bag.set(item.id, entry);
  renderBag();
}

function renderBag() {
  const entries = Array.from(state.bag.values());
  bagItems.innerHTML = '';
  if (!entries.length) {
    bagEmpty.style.display = 'block';
    bagFooter.style.display = 'none';
    return;
  }
  bagEmpty.style.display = 'none';
  bagFooter.style.display = 'grid';
  entries.forEach(entry => {
    const row = document.createElement('div');
    row.className = 'bag-item';
    row.innerHTML = `
      <img src="${entry.image}" alt="${entry.title}">
      <div class="bag-meta">
        <strong>${entry.title}</strong>
        <span>${entry.price}</span>
        <div class="bag-qty">
          <button type="button" aria-label="إنقاص" data-action="minus">−</button>
          <span>${entry.quantity}</span>
          <button type="button" aria-label="زيادة" data-action="plus">＋</button>
        </div>
      </div>
      <button type="button" aria-label="إزالة" data-action="remove">×</button>`;
    row.dataset.id = entry.id;
    bagItems.appendChild(row);
  });
  const total = entries.reduce((sum, entry) => {
    const price = parseInt(entry.price.replace(/[^\d]/g, ''), 10) || 0;
    return sum + price * entry.quantity;
  }, 0);
  bagTotal.textContent = `${total.toLocaleString('ar-SA')} ر.س`;
}

bagItems.addEventListener('click', (event) => {
  const row = event.target.closest('.bag-item');
  if (!row) return;
  const id = row.dataset.id;
  const entry = state.bag.get(id);
  if (!entry) return;
  const action = event.target.dataset.action;
  if (action === 'minus') {
    entry.quantity = Math.max(0, entry.quantity - 1);
    if (!entry.quantity) state.bag.delete(id);
  }
  if (action === 'plus') {
    entry.quantity += 1;
  }
  if (action === 'remove') {
    state.bag.delete(id);
  }
  renderBag();
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function loadAISuggestions(item) {
  aiList.innerHTML = '';
  for (let i = 0; i < 3; i += 1) {
    const skeleton = document.createElement('div');
    skeleton.className = 'ai-skeleton';
    aiList.appendChild(skeleton);
  }
  mockRecommend(item)
    .then(items => {
      aiList.innerHTML = '';
      items.forEach(rec => {
        const card = document.createElement('button');
        card.className = 'ai-card';
        card.type = 'button';
        card.innerHTML = `
          <img src="${rec.thumb}" alt="${rec.title}">
          <strong>${rec.title}</strong>
          <span>${rec.price}</span>`;
        card.addEventListener('click', () => {
          const galleryItem = galleryData.find(g => g.id === rec.id) || rec;
          openDetail(galleryItem);
        });
        aiList.appendChild(card);
      });
    })
    .catch(() => {
      aiList.innerHTML = '';
      aiFallback(item).forEach(rec => {
        const card = document.createElement('button');
        card.className = 'ai-card';
        card.type = 'button';
        card.innerHTML = `
          <img src="${rec.image}" alt="${rec.title}">
          <strong>${rec.title}</strong>
          <span>${rec.price}</span>`;
        card.addEventListener('click', () => openDetail(rec));
        aiList.appendChild(card);
      });
    });
}

async function mockRecommend(item) {
  const payload = { id: item.id, category: item.category, style: 'modern' };
  try {
    const response = await fakeFetch('/api/recommend', payload);
    return response.items;
  } catch (error) {
    throw error;
  }
}

async function fakeFetch(url, payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error('network'));
        return;
      }
      if (url === '/api/recommend') {
        const items = galleryData
          .filter(g => g.id !== payload.id)
          .slice(0, 5)
          .map(item => ({ id: item.id, title: item.title, thumb: item.image, price: item.price }));
        resolve({ items });
      }
      if (url === '/api/visual-try') {
        resolve({ compositedImage: payload.image || '' });
      }
    }, 450);
  });
}

segments.forEach(segment => {
  segment.addEventListener('click', () => {
    segments.forEach(btn => btn.classList.remove('active'));
    segment.classList.add('active');
    state.filter = segment.dataset.filter;
    state.galleryPage = 1;
    renderGallery(true);
  });
});

loadMoreBtn.addEventListener('click', () => {
  state.galleryPage += 1;
  renderGallery();
});

let scrollStartY = 0;
let refreshing = false;

galleryView.addEventListener('touchstart', (event) => {
  if (galleryView.scrollTop === 0) {
    scrollStartY = event.touches[0].clientY;
    refreshing = true;
  }
});

galleryView.addEventListener('touchmove', (event) => {
  if (!refreshing) return;
  const distance = event.touches[0].clientY - scrollStartY;
  if (distance > 60) {
    pullRefresh.classList.add('active');
  }
});

galleryView.addEventListener('touchend', () => {
  if (pullRefresh.classList.contains('active')) {
    setTimeout(() => {
      pullRefresh.classList.remove('active');
      showToast('تم التحديث');
    }, 600);
  }
  refreshing = false;
});

views.forEach(view => {
  view.addEventListener('scroll', () => {
    if (view.id === 'galleryView') {
      header.classList.toggle('shrink', view.scrollTop > 12);
    }
  });
});

tabButtons.forEach(button => {
  button.addEventListener('click', () => switchView(button.dataset.target, button));
});

function switchView(targetId, button) {
  views.forEach(view => {
    view.classList.toggle('active', view.id === targetId);
  });
  tabButtons.forEach(btn => btn.classList.toggle('active', btn === button));
  state.currentView = targetId;
  const label = button?.querySelector('span')?.textContent || 'معرض';
  headerTitle.textContent = `${label} Royal-4Store`;
  if (targetId !== 'galleryView') {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
}

function setupSearch() {
  suggestionsList.innerHTML = '';
  suggestionData.forEach(item => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'suggestion-item';
    row.innerHTML = `<img src="${item.image}" alt="${item.text}"><span>${item.text}</span>`;
    row.addEventListener('click', () => {
      applySearch(item.text);
    });
    suggestionsList.appendChild(row);
  });
  renderRecentSearches();
}

function applySearch(term) {
  if (!term) return;
  searchInput.value = term;
  state.recentSearches = [term, ...state.recentSearches.filter(item => item !== term)].slice(0, 5);
  renderRecentSearches();
  const match = galleryData.find(item => item.title.includes(term.split(' ')[0] || ''));
  if (match) openDetail(match);
}

function renderRecentSearches() {
  recentList.innerHTML = '';
  state.recentSearches.forEach(term => {
    const tag = document.createElement('button');
    tag.type = 'button';
    tag.className = 'pill tiny';
    tag.textContent = term;
    tag.addEventListener('click', () => applySearch(term));
    recentList.appendChild(tag);
  });
}

searchInput.addEventListener('input', (event) => {
  const value = event.target.value.trim();
  if (!value) {
    setupSearch();
    return;
  }
  const filtered = galleryData.filter(item => item.title.includes(value));
  suggestionsList.innerHTML = '';
  filtered.forEach(item => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'suggestion-item';
    row.innerHTML = `<img src="${item.image}" alt="${item.title}"><span>${item.title}</span>`;
    row.addEventListener('click', () => applySearch(item.title));
    suggestionsList.appendChild(row);
  });
});

clearHistory.addEventListener('click', () => {
  state.recentSearches = [];
  renderRecentSearches();
});

function renderCollections() {
  collectionsList.innerHTML = '';
  collectionData.forEach(item => {
    const card = document.createElement('article');
    card.className = 'collection-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>`;
    card.addEventListener('click', () => {
      applySearch(item.title);
      switchView('galleryView', tabButtons[0]);
    });
    collectionsList.appendChild(card);
  });
}

function setupVisualModal() {
  openVisualTry.addEventListener('click', () => {
    visualModal.classList.add('open');
    visualModal.setAttribute('aria-hidden', 'false');
  });
  visualClose.addEventListener('click', closeVisualModal);
  visualModal.addEventListener('click', (event) => {
    if (event.target === visualModal || event.target.classList.contains('visual-layer')) {
      closeVisualModal();
    }
  });

  roomUpload.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      beforeImage.src = loadEvent.target.result;
      visualSteps.forEach(step => step.classList.remove('active'));
      visualSteps[1].classList.add('active');
      visualSteps[2].classList.add('active');
    };
    reader.readAsDataURL(file);
  });

  previewSlider.addEventListener('pointerdown', startSlider);
  previewSlider.addEventListener('pointermove', moveSlider);
  previewSlider.addEventListener('pointerup', stopSlider);
  previewSlider.addEventListener('pointerleave', stopSlider);

  previewVisual.addEventListener('click', async () => {
    if (!beforeImage.src) {
      showToast('أضف صورة');
      return;
    }
    const payload = {
      image: beforeImage.src,
      item: state.activeItem?.image,
      scale: scaleRange.value,
      rotation: rotationRange.value
    };
    const response = await fakeFetch('/api/visual-try', payload);
    afterImage.src = response.compositedImage || state.activeItem?.image || beforeImage.src;
    updateAfterClip(50);
  });

  resetVisual.addEventListener('click', () => {
    roomUpload.value = '';
    beforeImage.src = '';
    afterImage.src = '';
    scaleRange.value = 100;
    rotationRange.value = 0;
    visualSteps.forEach(step => step.classList.remove('active'));
    visualSteps[0].classList.add('active');
  });

  saveVisual.addEventListener('click', () => {
    showToast('حُفظت المعاينة');
  });
}

let sliderActive = false;

function startSlider(event) {
  sliderActive = true;
  moveSlider(event);
}

function moveSlider(event) {
  if (!sliderActive) return;
  const track = previewSlider.parentElement.getBoundingClientRect();
  const percent = Math.min(100, Math.max(0, ((event.clientX - track.left) / track.width) * 100));
  updateAfterClip(percent);
}

function stopSlider() {
  sliderActive = false;
}

function updateAfterClip(percent) {
  const after = document.querySelector('.before-after .after');
  if (!after) return;
  after.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
  previewSlider.style.left = `${percent}%`;
}

function closeVisualModal() {
  visualModal.classList.remove('open');
  visualModal.setAttribute('aria-hidden', 'true');
}

function setupBackSwipe() {
  if (window.matchMedia('(min-width: 900px)').matches) {
    let startX = 0;
    let swiping = false;
    views.forEach(view => {
      view.addEventListener('pointerdown', (event) => {
        if (event.clientX > window.innerWidth * 0.12) return;
        swiping = true;
        startX = event.clientX;
      });
      view.addEventListener('pointermove', (event) => {
        if (!swiping) return;
        if (event.clientX - startX > 100) {
          swiping = false;
          switchView('galleryView', tabButtons[0]);
        }
      });
      view.addEventListener('pointerup', () => {
        swiping = false;
      });
    });
  }
}

backButton.addEventListener('click', () => {
  if (state.currentView !== 'galleryView') {
    switchView('galleryView', tabButtons[0]);
  } else {
    closeDetail();
  }
});

infoButton.addEventListener('focus', () => infoButton.nextElementSibling?.classList.add('show'));
infoButton.addEventListener('blur', () => infoButton.nextElementSibling?.classList.remove('show'));

function init() {
  initSplash();
  renderGallery(true);
  setupSearch();
  renderCollections();
  setupVisualModal();
  setupBackSwipe();
  renderBag();
}

document.addEventListener('DOMContentLoaded', init);
