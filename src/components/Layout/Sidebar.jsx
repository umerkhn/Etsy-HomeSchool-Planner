import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { sections, allPages, totalPages } from '../../utils/pageRegistry';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState(
    Object.fromEntries(sections.map((s) => [s.title, true]))
  );

  const currentPage = allPages.find((p) => p.path === location.pathname);

  const toggleSection = (title) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar fixed top-0 left-0 h-full w-72 bg-white border-r border-light-gray z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo / Header */}
        <div className="sticky top-0 bg-white border-b border-light-gray p-5 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-lg font-bold text-primary leading-tight">
                Homeschool Planner
              </h1>
              <p className="text-xs text-medium-gray mt-0.5">2025–2026</p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg hover:bg-cream transition-colors"
            >
              <svg className="w-5 h-5 text-dark-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {currentPage && (
            <div className="mt-2 text-xs text-medium-gray">
              Page {currentPage.num} of {totalPages}
            </div>
          )}
        </div>

        {/* Navigation Sections */}
        <nav className="p-3">
          {sections.map((section) => (
            <div key={section.title} className="mb-1">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-dark-gray uppercase tracking-wider hover:bg-cream rounded-lg transition-colors"
              >
                <span>{section.title}</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${
                    expandedSections[section.title] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedSections[section.title] && (
                <div className="ml-1 animate-fade-in">
                  {section.pages.map((page) => (
                    <NavLink
                      key={page.path}
                      to={page.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-all ${
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-dark-gray hover:bg-cream hover:text-charcoal'
                        }`
                      }
                    >
                      <span className="w-5 text-right text-medium-gray text-[10px] flex-shrink-0">
                        {page.num}
                      </span>
                      <span className="truncate">{page.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-light-gray p-4">
          <p className="text-[10px] text-medium-gray text-center">
            © 2025 Ultimate Homeschool Planner
          </p>
        </div>
      </aside>
    </>
  );
}
