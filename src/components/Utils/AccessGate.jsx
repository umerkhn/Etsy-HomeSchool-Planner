import { useState } from 'react';

export default function AccessGate({ children }) {
  const [hasAccess, setHasAccess] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      sessionStorage.setItem('accessToken', token);
      return true;
    }
    return !!sessionStorage.getItem('accessToken');
  });

  if (hasAccess) return children;

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-lg border border-light-gray p-10">
          {/* Logo */}
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>

          <h1 className="font-[Playfair_Display] text-2xl font-bold text-charcoal mb-2">
            Ultimate Homeschool Planner
          </h1>
          <p className="text-sm text-dark-gray mb-6">2025–2026 Academic Year</p>

          <div className="bg-cream rounded-xl p-5 mb-6">
            <p className="text-sm text-charcoal leading-relaxed">
              Please use your <strong>Gumroad purchase link</strong> to access this planner.
              Your link includes an access token that unlocks the full app.
            </p>
          </div>

          <p className="text-xs text-medium-gray">
            Need help? Contact support at your point of purchase.
          </p>

          {/* Dev bypass for testing */}
          <button
            onClick={() => {
              sessionStorage.setItem('accessToken', 'dev');
              setHasAccess(true);
            }}
            className="mt-6 text-xs text-medium-gray hover:text-primary transition-colors underline"
          >
            Developer Access
          </button>
        </div>
      </div>
    </div>
  );
}
