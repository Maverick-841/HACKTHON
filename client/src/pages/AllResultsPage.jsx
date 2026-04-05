import { useEffect, useMemo, useState } from 'react';
import { useShopContext } from '../context/shopcontext';
import UnifiedRecommendationCard from '../components/UnifiedRecommendationCard';

const CATEGORY_LIST = [
  'Movies',
  'Music',
  'Books',
  'Podcasts',
  'Web Series',
  'Anime',
  'Documentaries',
];

const AllResultsPage = () => {
  const { userPreferences, backendUrl } = useShopContext();

  const activeMood =
    userPreferences.selectedMood || localStorage.getItem('selectedMood');
  const selectedLanguage = userPreferences.selectedLanguages?.[0] || 'English';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(Boolean(activeMood));
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLanguage, setActiveLanguage] = useState('All');

  useEffect(() => {
    if (userPreferences.selectedMood) {
      localStorage.setItem('selectedMood', userPreferences.selectedMood);
    }
  }, [userPreferences.selectedMood]);

  useEffect(() => {
    async function fetchAllRecommendations() {
      setLoading(true);
      try {
        const requests = CATEGORY_LIST.map((category) =>
          fetch(`${backendUrl}/mood/recommend`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              mood: activeMood,
              language: selectedLanguage,
              category,
            }),
          })
        );

        const responses = await Promise.all(requests);
        const data = await Promise.all(
          responses.map((response) => response.json())
        );

        const merged = data.flatMap((entry) => entry.recommendations || []);
        setItems(merged);
      } catch (error) {
        console.log('All categories fetch error:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    if (activeMood) {
      fetchAllRecommendations();
    }
  }, [activeMood, backendUrl, selectedLanguage]);

  const uniqueItems = useMemo(() => {
    const seen = new Set();

    return items.filter((item) => {
      const key = [
        String(item.title || '').trim().toLowerCase(),
        String(item.category || '').trim().toLowerCase(),
        String(item.language || '').trim().toLowerCase(),
      ].join('|');

      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [items]);

  const availableCategories = useMemo(() => {
    const categories = Array.from(
      new Set(uniqueItems.map((item) => item.category).filter(Boolean))
    );
    return ['All', ...categories];
  }, [uniqueItems]);

  const effectiveCategory = availableCategories.includes(activeCategory)
    ? activeCategory
    : 'All';

  const availableLanguages = useMemo(() => {
    const source =
      effectiveCategory === 'All'
        ? uniqueItems
        : uniqueItems.filter(
            (item) =>
              String(item.category || '').toLowerCase() ===
              effectiveCategory.toLowerCase()
          );

    const languages = Array.from(
      new Set(source.map((item) => item.language).filter(Boolean))
    );

    return ['All', ...languages];
  }, [effectiveCategory, uniqueItems]);

  const effectiveLanguage = availableLanguages.includes(activeLanguage)
    ? activeLanguage
    : 'All';

  const visibleItems = useMemo(() => {
    return uniqueItems.filter((item) => {
      const categoryOk =
        effectiveCategory === 'All' ||
        String(item.category || '').toLowerCase() ===
          effectiveCategory.toLowerCase();

      const languageOk =
        effectiveLanguage === 'All' ||
        String(item.language || '').toLowerCase() ===
          effectiveLanguage.toLowerCase();

      return categoryOk && languageOk;
    });
  }, [effectiveCategory, effectiveLanguage, uniqueItems]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white pb-12">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
                All Categories
              </div>
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">
                  Combined Recommendations
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-white/60 md:text-base">
                  One clear view across all categories with unique results only.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
                Unique: {uniqueItems.length}
              </span>
              {activeMood && (
                <span className="rounded-full border border-pink-400/40 bg-pink-500/10 px-3 py-1 text-sm text-pink-100">
                  Mood: {activeMood}
                </span>
              )}
              {userPreferences.selectedLanguages?.map((language) => (
                <span
                  key={language}
                  className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-sm text-purple-100"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-white/50 mb-2">
              Category Filter
            </p>
            <div className="flex flex-wrap gap-3">
              {availableCategories.map((category) => {
                const count =
                  category === 'All'
                    ? uniqueItems.length
                    : uniqueItems.filter(
                        (item) =>
                          String(item.category || '').toLowerCase() ===
                          category.toLowerCase()
                      ).length;

                const isActive = effectiveCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white text-slate-950 shadow-lg shadow-white/20'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {category}{' '}
                    <span className="ml-1 text-xs opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-white/50 mb-2">
              Language Filter
            </p>
            <div className="flex flex-wrap gap-3">
              {availableLanguages.map((language) => {
                const count =
                  language === 'All'
                    ? uniqueItems.filter((item) =>
                        effectiveCategory === 'All'
                          ? true
                          : String(item.category || '').toLowerCase() ===
                            effectiveCategory.toLowerCase()
                      ).length
                    : uniqueItems.filter((item) => {
                        const categoryOk =
                          effectiveCategory === 'All' ||
                          String(item.category || '').toLowerCase() ===
                            effectiveCategory.toLowerCase();
                        const languageOk =
                          String(item.language || '').toLowerCase() ===
                          language.toLowerCase();
                        return categoryOk && languageOk;
                      }).length;

                const isActive = effectiveLanguage === language;

                return (
                  <button
                    key={language}
                    type="button"
                    onClick={() => setActiveLanguage(language)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white text-slate-950 shadow-lg shadow-white/20'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {language}{' '}
                    <span className="ml-1 text-xs opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white/70 backdrop-blur-xl">
              Loading recommendations...
            </div>
          ) : visibleItems.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {visibleItems.map((item) => (
                <UnifiedRecommendationCard
                  key={`${item.title}-${item.category}-${item.language}`}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center text-white/70 backdrop-blur-xl">
              <div>
                <h2 className="text-2xl font-semibold text-white">No matches found</h2>
                <p className="mt-2">Try changing category or language filter.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllResultsPage;
