/* ============================================
   BREEZBLOX DIRECTORY — Core JavaScript
   Client-side filtering, search, and rendering
   ============================================ */

(function () {
    'use strict';

    // ---- State ----
    let allListings = [];
    let categories = [];
    let currentFilters = {
        search: '',
        category: '',
        subcategory: '',
        tag: ''
    };

    // ---- Data Loading ----
    async function loadJSON(path) {
        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error(`Failed to load ${path}`);
            return res.json();
        } catch (err) {
            console.error('[DIRECTORY]', err);
            return null;
        }
    }

    async function initDirectory() {
        const [catData, listData] = await Promise.all([
            loadJSON('../data/categories.json'),
            loadJSON('../data/listings.json')
        ]);

        if (catData) categories = catData.categories || [];
        if (listData) allListings = (listData.listings || []).filter(l => l.status === 'published');

        // Dispatch ready event for page-specific init
        document.dispatchEvent(new CustomEvent('directory:ready', {
            detail: { listings: allListings, categories }
        }));
    }

    // ---- Rendering Helpers ----
    function getInitials(name) {
        return name.split(/\s+/).map(w => w[0]).join('').substring(0, 2).toUpperCase();
    }

    function getCategoryName(catId) {
        const cat = categories.find(c => c.id === catId);
        return cat ? cat.name : catId;
    }

    function getSubcategoryName(catId, subId) {
        const cat = categories.find(c => c.id === catId);
        if (!cat) return subId;
        const sub = cat.subcategories.find(s => s.id === subId);
        return sub ? sub.name : subId;
    }

    function createListingCard(listing) {
        const card = document.createElement('a');
        card.className = 'listing-card';
        card.href = `listing.html?slug=${listing.slug}`;

        const tagsHTML = (listing.tags || [])
            .map(t => `<span class="card-tag">${t}</span>`)
            .join('');

        card.innerHTML = `
            <div class="corner-decoration corner-tl"></div>
            <div class="corner-decoration corner-tr"></div>
            <div class="corner-decoration corner-bl"></div>
            <div class="corner-decoration corner-br"></div>
            <div class="card-header">
                <div class="card-logo">${getInitials(listing.name)}</div>
                <div>
                    <div class="card-title">${listing.name}</div>
                    <div class="card-category">${getSubcategoryName(listing.category, listing.subcategory)}</div>
                </div>
            </div>
            <div class="card-desc">${listing.description_short}</div>
            <div class="card-tags">${tagsHTML}</div>
        `;
        return card;
    }

    // ---- Filtering ----
    function filterListings() {
        let results = [...allListings];
        const q = currentFilters.search.toLowerCase().trim();

        if (q) {
            results = results.filter(l =>
                l.name.toLowerCase().includes(q) ||
                l.description_short.toLowerCase().includes(q) ||
                l.category.toLowerCase().includes(q) ||
                l.subcategory.toLowerCase().includes(q) ||
                (l.tags || []).some(t => t.toLowerCase().includes(q))
            );
        }

        if (currentFilters.category) {
            results = results.filter(l => l.category === currentFilters.category);
        }

        if (currentFilters.subcategory) {
            results = results.filter(l => l.subcategory === currentFilters.subcategory);
        }

        if (currentFilters.tag) {
            results = results.filter(l => (l.tags || []).includes(currentFilters.tag));
        }

        return results;
    }

    // ---- Browse Page ----
    function initBrowsePage() {
        const grid = document.getElementById('listings-grid');
        const searchInput = document.getElementById('search-input');
        const catFilter = document.getElementById('filter-category');
        const subFilter = document.getElementById('filter-subcategory');
        const countEl = document.getElementById('results-count');

        if (!grid) return;

        // Populate category dropdown
        if (catFilter) {
            categories.forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat.id;
                opt.textContent = cat.name;
                catFilter.appendChild(opt);
            });
        }

        function renderGrid() {
            const results = filterListings();
            grid.innerHTML = '';

            if (results.length === 0) {
                grid.innerHTML = '<div class="no-results">> NO MATCHING RECORDS FOUND_</div>';
            } else {
                results.forEach(l => grid.appendChild(createListingCard(l)));
            }

            if (countEl) {
                countEl.textContent = `> ${results.length} LISTING${results.length !== 1 ? 'S' : ''} FOUND_`;
            }
        }

        // Event listeners
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentFilters.search = e.target.value;
                renderGrid();
            });
        }

        if (catFilter) {
            catFilter.addEventListener('change', (e) => {
                currentFilters.category = e.target.value;
                currentFilters.subcategory = '';

                // Repopulate subcategory dropdown
                if (subFilter) {
                    subFilter.innerHTML = '<option value="">ALL SUBCATEGORIES</option>';
                    if (e.target.value) {
                        const cat = categories.find(c => c.id === e.target.value);
                        if (cat) {
                            cat.subcategories.forEach(sub => {
                                const opt = document.createElement('option');
                                opt.value = sub.id;
                                opt.textContent = sub.name;
                                subFilter.appendChild(opt);
                            });
                        }
                    }
                }

                renderGrid();
            });
        }

        if (subFilter) {
            subFilter.addEventListener('change', (e) => {
                currentFilters.subcategory = e.target.value;
                renderGrid();
            });
        }

        // Check for URL params (e.g., browse.html?category=ai-tools)
        const params = new URLSearchParams(window.location.search);
        if (params.get('category')) {
            currentFilters.category = params.get('category');
            if (catFilter) catFilter.value = currentFilters.category;

            // Populate subcategories for initial category
            if (subFilter) {
                const cat = categories.find(c => c.id === currentFilters.category);
                if (cat) {
                    cat.subcategories.forEach(sub => {
                        const opt = document.createElement('option');
                        opt.value = sub.id;
                        opt.textContent = sub.name;
                        subFilter.appendChild(opt);
                    });
                }
            }
        }

        renderGrid();
    }

    // ---- Landing Page ----
    function initLandingPage() {
        const catNav = document.getElementById('category-nav');
        const featuredGrid = document.getElementById('featured-grid');
        const totalCountEl = document.getElementById('total-listings');
        const catCountEl = document.getElementById('category-count');

        // Render category nav cards
        if (catNav) {
            categories.forEach(cat => {
                const count = allListings.filter(l => l.category === cat.id).length;
                const card = document.createElement('a');
                card.className = 'category-card';
                card.href = `browse.html?category=${cat.id}`;
                card.innerHTML = `
                    <div class="corner-decoration corner-tl"></div>
                    <div class="corner-decoration corner-tr"></div>
                    <div class="corner-decoration corner-bl"></div>
                    <div class="corner-decoration corner-br"></div>
                    <span class="cat-icon">${cat.icon}</span>
                    <div class="cat-name">${cat.name}</div>
                    <div class="cat-desc">${cat.description}</div>
                    <div class="cat-count">> ${count} LISTING${count !== 1 ? 'S' : ''} INDEXED_</div>
                `;
                catNav.appendChild(card);
            });
        }

        // Render featured listings
        if (featuredGrid) {
            const featured = allListings.filter(l => l.featured);
            featured.forEach(l => featuredGrid.appendChild(createListingCard(l)));
        }

        // Stats
        if (totalCountEl) totalCountEl.textContent = allListings.length;
        if (catCountEl) catCountEl.textContent = categories.length;
    }

    // ---- Listing Detail Page ----
    function initListingPage() {
        const container = document.getElementById('listing-detail');
        if (!container) return;

        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug');

        if (!slug) {
            container.innerHTML = '<div class="no-results">> NO LISTING SPECIFIED_</div>';
            return;
        }

        const listing = allListings.find(l => l.slug === slug);

        if (!listing) {
            container.innerHTML = '<div class="no-results">> LISTING NOT FOUND_</div>';
            return;
        }

        // Update page title
        document.title = `${listing.name} — BREEZBLOX Directory`;

        const tagsHTML = (listing.tags || [])
            .map(t => `<span class="detail-tag">${t}</span>`)
            .join('');

        container.innerHTML = `
            <a href="browse.html" class="back-link">BACK TO DIRECTORY</a>

            <div class="detail-header">
                <div class="detail-logo">${getInitials(listing.name)}</div>
                <div>
                    <h1 class="detail-title">${listing.name}</h1>
                    <div class="detail-category">${getCategoryName(listing.category)} / ${getSubcategoryName(listing.category, listing.subcategory)}</div>
                </div>
            </div>

            <div class="detail-body">${listing.description_long}</div>

            <div class="detail-tags">${tagsHTML}</div>

            <div class="detail-meta">
                <div class="meta-row">
                    <span class="meta-label">Website</span>
                    <span class="meta-value"><a href="${listing.website_url}" target="_blank" rel="noopener">${listing.website_url}</a></span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Category</span>
                    <span class="meta-value">${getCategoryName(listing.category)}</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Subcategory</span>
                    <span class="meta-value">${getSubcategoryName(listing.category, listing.subcategory)}</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Added</span>
                    <span class="meta-value">${listing.date_added}</span>
                </div>
            </div>

            <a href="${listing.website_url}" target="_blank" rel="noopener" class="detail-cta">VISIT WEBSITE →</a>
        `;
    }

    // ---- Submit Form ----
    function initSubmitPage() {
        const form = document.getElementById('submit-form');
        const catSelect = document.getElementById('submit-category');
        const subSelect = document.getElementById('submit-subcategory');

        if (catSelect) {
            categories.forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat.id;
                opt.textContent = cat.name;
                catSelect.appendChild(opt);
            });

            catSelect.addEventListener('change', () => {
                if (subSelect) {
                    subSelect.innerHTML = '<option value="">Select subcategory...</option>';
                    const cat = categories.find(c => c.id === catSelect.value);
                    if (cat) {
                        cat.subcategories.forEach(sub => {
                            const opt = document.createElement('option');
                            opt.value = sub.id;
                            opt.textContent = sub.name;
                            subSelect.appendChild(opt);
                        });
                    }
                }
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Placeholder: just show confirmation
                form.innerHTML = `
                    <div class="placeholder-section">
                        <div class="placeholder-icon">✓</div>
                        <div class="placeholder-title">SUBMISSION RECEIVED</div>
                        <div class="placeholder-desc">Your listing has been queued for review. You will be notified once it has been approved.</div>
                    </div>
                `;
            });
        }
    }

    // ---- Page Router ----
    document.addEventListener('directory:ready', () => {
        const page = document.body.dataset.page;
        switch (page) {
            case 'landing': initLandingPage(); break;
            case 'browse': initBrowsePage(); break;
            case 'listing': initListingPage(); break;
            case 'submit': initSubmitPage(); break;
        }
    });

    // ---- Boot ----
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDirectory);
    } else {
        initDirectory();
    }
})();
