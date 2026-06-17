import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { sections, allPages, totalPages } from '../../utils/pageRegistry';

// Section Icons
const ICONS = {
  'Yearly Overview': (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  'Quarterly Planning': (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
    </svg>
  ),
  'Monthly Planning': (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
    </svg>
  ),
  'Weekly Planning': (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  'Tracking & Records': (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75v-.008z" />
    </svg>
  ),
};

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState(
    Object.fromEntries(sections.map((s) => [s.title, true]))
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSection = (title) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const widthClass = isCollapsed ? 'w-16' : 'w-[260px]';

  return (
    <>
      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-cream border-r border-light-gray z-50 transform transition-all duration-300 ease-in-out flex flex-col ${widthClass} ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        {/* Workspace Switcher / Header */}
        <div className="h-14 flex items-center justify-between px-3 border-b border-light-gray/60 shrink-0">
          {!isCollapsed && (
            <div className="flex items-center gap-2 px-1 w-full hover:bg-light-gray/40 p-1 rounded-md cursor-pointer transition-colors">
              <div className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
                S
              </div>
              <div className="flex-1 overflow-hidden">
                <h1 className="text-sm font-semibold text-charcoal truncate">Smith Family</h1>
                <p className="text-[10px] text-medium-gray truncate">Homeschool Planner</p>
              </div>
              <svg className="w-4 h-4 text-medium-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          )}
          {isCollapsed && (
            <div className="w-full flex justify-center">
              <div className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center text-xs font-bold">
                S
              </div>
            </div>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-3 px-2 custom-scrollbar">
          {sections.map((section) => (
            <div key={section.title} className="mb-4">
              {!isCollapsed ? (
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-semibold text-medium-gray uppercase tracking-wider hover:text-dark-gray transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    {ICONS[section.title]}
                    {section.title}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${
                      expandedSections[section.title] ? 'rotate-90 text-dark-gray' : 'text-light-gray group-hover:text-dark-gray'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <div className="flex justify-center mb-2 text-medium-gray" title={section.title}>
                  {ICONS[section.title]}
                </div>
              )}

              {(!isCollapsed && expandedSections[section.title]) && (
                <div className="mt-0.5 space-y-0.5">
                  {section.pages.map((page) => (
                    <NavLink
                      key={page.path}
                      to={page.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-2.5 py-1.5 text-sm rounded-md transition-all ${
                          isActive
                            ? 'bg-white text-primary font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-light-gray/60'
                            : 'text-dark-gray hover:bg-light-gray/30 border border-transparent'
                        }`
                      }
                    >
                      <span className="truncate">{page.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Toggle */}
        <div className="p-2 border-t border-light-gray/60 flex justify-end shrink-0">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 text-medium-gray hover:text-charcoal hover:bg-light-gray/40 rounded-md transition-colors hidden lg:block"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <svg className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}
