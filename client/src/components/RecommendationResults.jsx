import { useEffect, useMemo, useState } from 'react';

const RecommendationResults = ({
  title,
  description,
  categoryLabel,
  items,
  loading,
  selectedMood,
  selectedLanguages = [],
  emptyMessage = 'No recommendations match this filter yet.',
  renderCard,
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title-asc');
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const uniqueItems = useMemo(() => {
    const seen = new Set();

    return items.filter((item) => {
      const key = [
        String(item.title || '').trim().toLowerCase(),
        String(item.category || '').trim().toLowerCase(),
        String(item.language || '').trim().toLowerCase(),
      ].join('|');

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }, [items]);

  const availableFilters = useMemo(() => {
    const languages = Array.from(
      new Set(uniqueItems.map((item) => item.language).filter(Boolean))
    );

    return ['All', ...languages];
  }, [uniqueItems]);

  const effectiveFilter = availableFilters.includes(activeFilter)
    ? activeFilter
    : 'All';

  const visibleItems = useMemo(() => {
    if (effectiveFilter === 'All') {
      return uniqueItems;
    }

    return uniqueItems.filter(
      (item) => (item.language || '').toLowerCase() === effectiveFilter.toLowerCase()
    );
  }, [effectiveFilter, uniqueItems]);

  const searchedItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return visibleItems;
    }

    return visibleItems.filter((item) => {
      const title = String(item.title || '').toLowerCase();
      const description = String(item.description || '').toLowerCase();
      const language = String(item.language || '').toLowerCase();
      const category = String(item.category || '').toLowerCase();

      return (
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch) ||
        language.includes(normalizedSearch) ||
        category.includes(normalizedSearch)
      );
    });
  }, [searchTerm, visibleItems]);

  const finalItems = useMemo(() => {
    const sorted = [...searchedItems];

    sorted.sort((a, b) => {
      const titleA = String(a.title || '').toLowerCase();
      const titleB = String(b.title || '').toLowerCase();
      const langA = String(a.language || '').toLowerCase();
      const langB = String(b.language || '').toLowerCase();

      if (sortBy === 'title-desc') return titleB.localeCompare(titleA);
      if (sortBy === 'language-asc') return langA.localeCompare(langB) || titleA.localeCompare(titleB);
      if (sortBy === 'language-desc') return langB.localeCompare(langA) || titleA.localeCompare(titleB);
      return titleA.localeCompare(titleB);
    });

    if (sortBy === 'random') {
      const shuffled = [...sorted];
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor((((i + 1) * 9301 + shuffleSeed * 49297) % 233280) / 233280 * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    return sorted;
  }, [searchedItems, sortBy, shuffleSeed]);

  const totalPages = Math.max(1, Math.ceil(finalItems.length / itemsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm, sortBy, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return finalItems.slice(start, start + itemsPerPage);
  }, [currentPage, finalItems, itemsPerPage]);

  const exportAsJson = () => {
    const payload = {
      title,
      categoryLabel,
      total: finalItems.length,
      generatedAt: new Date().toISOString(),
      recommendations: finalItems,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${String(categoryLabel || 'recommendations').toLowerCase()}-recommendations.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyTitles = async () => {
    const text = finalItems
      .map((item, index) => `${index + 1}. ${item.title || 'Untitled'}${item.language ? ` (${item.language})` : ''}`)
      .join('\n');

    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const hasActiveControls =
    effectiveFilter !== 'All' ||
    searchTerm.trim() !== '' ||
    sortBy !== 'title-asc' ||
    itemsPerPage !== 8;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white pb-12">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
                {categoryLabel}
              </div>
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
                <p className="mt-2 max-w-2xl text-sm text-white/60 md:text-base">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
                All: {uniqueItems.length}
              </span>
              {selectedMood && (
                <span className="rounded-full border border-pink-400/40 bg-pink-500/10 px-3 py-1 text-sm text-pink-100">
                  Mood: {selectedMood}
                </span>
              )}
              {selectedLanguages.map((language) => (
                <span
                  key={language}
                  className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-sm text-purple-100"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {availableFilters.map((filter) => {
              const count =
                filter === 'All'
                  ? uniqueItems.length
                  : uniqueItems.filter(
                      (item) =>
                        (item.language || '').toLowerCase() === filter.toLowerCase()
                    ).length;

              const isActive = effectiveFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-lg shadow-white/20'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {filter} <span className="ml-1 text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/60">
                Search In Results
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search title, description, language..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-300/60 focus:ring-2 focus:ring-blue-400/30"
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/60">
                Sort By
              </span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-300/60 focus:ring-2 focus:ring-blue-400/30"
              >
                <option value="title-asc">Title: A to Z</option>
                <option value="title-desc">Title: Z to A</option>
                <option value="language-asc">Language: A to Z</option>
                <option value="language-desc">Language: Z to A</option>
                <option value="random">Shuffle</option>
              </select>
            </label>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <label>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/60">
                Items Per Page
              </span>
              <select
                value={itemsPerPage}
                onChange={(event) => setItemsPerPage(Number(event.target.value))}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-300/60 focus:ring-2 focus:ring-blue-400/30"
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
              </select>
            </label>

            <button
              type="button"
              onClick={() => {
                setSortBy('random');
                setShuffleSeed((seed) => seed + 1);
              }}
              className="self-end rounded-xl border border-amber-300/20 bg-amber-400/10 px-4 py-2.5 text-sm font-medium text-amber-100 transition hover:bg-amber-400/20"
            >
              Shuffle Again
            </button>

            <button
              type="button"
              onClick={copyTitles}
              className="self-end rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-2.5 text-sm font-medium text-emerald-100 transition hover:bg-emerald-400/20"
            >
              {copied ? 'Copied Titles' : 'Copy Titles'}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-white/70">
              Showing <span className="font-semibold text-white">{finalItems.length}</span> of{' '}
              <span className="font-semibold text-white">{uniqueItems.length}</span> total recommendations
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={exportAsJson}
                className="rounded-lg border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-100 transition hover:bg-blue-400/20"
              >
                Export JSON
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveFilter('All');
                  setSearchTerm('');
                  setSortBy('title-asc');
                  setItemsPerPage(8);
                  setCurrentPage(1);
                }}
                disabled={!hasActiveControls}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Reset Controls
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white/70 backdrop-blur-xl">
              Loading recommendations...
            </div>
          ) : finalItems.length > 0 ? (
            <>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {paginatedItems.map((item) => renderCard(item))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-sm text-white/70">
                  Page <span className="font-semibold text-white">{currentPage}</span> of{' '}
                  <span className="font-semibold text-white">{totalPages}</span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center text-white/70 backdrop-blur-xl">
              <div>
                <h2 className="text-2xl font-semibold text-white">No matches found</h2>
                <p className="mt-2">{emptyMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationResults;