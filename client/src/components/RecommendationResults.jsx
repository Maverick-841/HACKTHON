import { useMemo, useState } from 'react';

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
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white/70 backdrop-blur-xl">
              Loading recommendations...
            </div>
          ) : visibleItems.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {visibleItems.map((item) => renderCard(item))}
            </div>
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