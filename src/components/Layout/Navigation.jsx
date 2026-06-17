import { useLocation } from 'react-router-dom';
import { allPages, sections, totalPages } from '../../utils/pageRegistry';
import SaveIndicator from '../Utils/SaveIndicator';

export default function Navigation({ onMenuClick }) {
  const location = useLocation();
  const currentPage = allPages.find((p) => p.path === location.pathname);
  const currentSection = sections.find((s) =>
    s.pages.some((p) => p.path === location.pathname)
  );

  return (
    <header className="navigation sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-light-gray">
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Left: Hamburger + Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="hamburger-btn lg:hidden p-2 rounded-lg hover:bg-cream transition-colors"
          >
            <svg className="w-5 h-5 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs">
            <span className="text-medium-gray hidden sm:inline">Planner</span>
            {currentSection && (
              <>
                <svg className="w-3 h-3 text-light-gray hidden sm:inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-medium-gray hidden sm:inline">{currentSection.title}</span>
              </>
            )}
            {currentPage && (
              <>
                <svg className="w-3 h-3 text-light-gray hidden sm:inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-charcoal font-medium">{currentPage.label}</span>
              </>
            )}
          </nav>
        </div>

        {/* Right: Page counter + Save indicator */}
        <div className="flex items-center gap-4">
          {currentPage && (
            <span className="text-xs text-medium-gray hidden sm:inline">
              Page {currentPage.num} of {totalPages}
            </span>
          )}
          <SaveIndicator />
        </div>
      </div>
    </header>
  );
}
