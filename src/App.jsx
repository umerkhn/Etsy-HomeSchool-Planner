import { useState, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PlannerProvider } from './context/PlannerContext';
import AccessGate from './components/Shared/AccessGate';
import Sidebar from './components/Layout/Sidebar';
import Navigation from './components/Layout/Navigation';

// Lazy-loaded page components
const CoverPage = lazy(() => import('./components/Pages/CoverPage'));
const HowToUsePage = lazy(() => import('./components/Pages/HowToUsePage'));
const MissionPage = lazy(() => import('./components/Pages/MissionPage'));
const YearAtGlancePage = lazy(() => import('./components/Pages/YearAtGlancePage'));
const AcademicPlanningPage = lazy(() => import('./components/Pages/AcademicPlanningPage'));
const SubjectBreakdownPage = lazy(() => import('./components/Pages/SubjectBreakdownPage'));
const CurriculumTrackingPage = lazy(() => import('./components/Pages/CurriculumTrackingPage'));
const ImportantDatesPage = lazy(() => import('./components/Pages/ImportantDatesPage'));
const QuarterlyOverviewPage = lazy(() => import('./components/Pages/QuarterlyOverviewPage'));
const QuarterlyGoalsPage = lazy(() => import('./components/Pages/QuarterlyGoalsPage'));
const MonthlyCalendarPage = lazy(() => import('./components/Pages/MonthlyCalendarPage'));
const MonthlyOverviewPage = lazy(() => import('./components/Pages/MonthlyOverviewPage'));
const WeeklyPlanPage = lazy(() => import('./components/Pages/WeeklyPlanPage'));
const AttendancePage = lazy(() => import('./components/Pages/AttendancePage'));
const GradesPage = lazy(() => import('./components/Pages/GradesPage'));
const ReadingLogPage = lazy(() => import('./components/Pages/ReadingLogPage'));
const ProgressNotesPage = lazy(() => import('./components/Pages/ProgressNotesPage'));
const ExtracurricularsPage = lazy(() => import('./components/Pages/ExtracurricularsPage'));
const FieldTripsPage = lazy(() => import('./components/Pages/FieldTripsPage'));
const ExpensesPage = lazy(() => import('./components/Pages/ExpensesPage'));
const PortfolioPage = lazy(() => import('./components/Pages/PortfolioPage'));
const ReflectionPage = lazy(() => import('./components/Pages/ReflectionPage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20 animate-fade-in">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-medium-gray">Loading page...</p>
      </div>
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PlannerProvider>
      <AccessGate>
        <HashRouter>
          <div className="flex h-screen overflow-hidden bg-cream font-body">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col overflow-y-auto">
              <Navigation onMenuClick={() => setSidebarOpen(true)} />
              <main className="flex-1">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Section 1: Yearly Overview */}
                    <Route path="/" element={<CoverPage />} />
                    <Route path="/how-to-use" element={<HowToUsePage />} />
                    <Route path="/mission" element={<MissionPage />} />
                    <Route path="/year-at-glance" element={<YearAtGlancePage />} />
                    <Route path="/academic-planning" element={<AcademicPlanningPage />} />
                    <Route path="/subject-breakdown" element={<SubjectBreakdownPage />} />
                    <Route path="/curriculum-tracking" element={<CurriculumTrackingPage />} />
                    <Route path="/important-dates" element={<ImportantDatesPage />} />

                    {/* Section 2: Quarterly Planning */}
                    <Route path="/quarterly/:quarter" element={<QuarterlyOverviewPage />} />
                    <Route path="/quarterly-goals/:quarter" element={<QuarterlyGoalsPage />} />

                    {/* Section 3: Monthly Planning */}
                    <Route path="/monthly-calendar/:month" element={<MonthlyCalendarPage />} />
                    <Route path="/monthly-overview/:month" element={<MonthlyOverviewPage />} />

                    {/* Section 4: Weekly Planning */}
                    <Route path="/weekly/:week" element={<WeeklyPlanPage />} />

                    {/* Section 5: Tracking & Records */}
                    <Route path="/attendance" element={<AttendancePage />} />
                    <Route path="/grades" element={<GradesPage />} />
                    <Route path="/reading-log" element={<ReadingLogPage />} />
                    <Route path="/progress-notes" element={<ProgressNotesPage />} />
                    <Route path="/extracurriculars" element={<ExtracurricularsPage />} />
                    <Route path="/field-trips" element={<FieldTripsPage />} />
                    <Route path="/expenses" element={<ExpensesPage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/reflection" element={<ReflectionPage />} />
                  </Routes>
                </Suspense>
              </main>
            </div>
          </div>
        </HashRouter>
      </AccessGate>
    </PlannerProvider>
  );
}
