import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PlannerProvider } from './context/PlannerContext';
import AccessGate from './components/Utils/AccessGate';
import Sidebar from './components/Layout/Sidebar';
import Navigation from './components/Layout/Navigation';

// Section 1: Yearly Overview
import CoverPage from './components/Pages/CoverPage';
import HowToUsePage from './components/Pages/HowToUsePage';
import MissionPage from './components/Pages/MissionPage';
import YearAtGlancePage from './components/Pages/YearAtGlancePage';
import AcademicPlanningPage from './components/Pages/AcademicPlanningPage';
import SubjectBreakdownPage from './components/Pages/SubjectBreakdownPage';
import CurriculumTrackingPage from './components/Pages/CurriculumTrackingPage';
import ImportantDatesPage from './components/Pages/ImportantDatesPage';

// Section 2: Quarterly Planning
import QuarterlyOverviewPage from './components/Pages/QuarterlyOverviewPage';
import QuarterlyGoalsPage from './components/Pages/QuarterlyGoalsPage';

// Section 3: Monthly Planning
import MonthlyCalendarPage from './components/Pages/MonthlyCalendarPage';
import MonthlyOverviewPage from './components/Pages/MonthlyOverviewPage';

// Section 4: Weekly Planning
import WeeklyPlanPage from './components/Pages/WeeklyPlanPage';

// Section 5: Tracking & Records
import AttendancePage from './components/Pages/AttendancePage';
import GradesPage from './components/Pages/GradesPage';
import ReadingLogPage from './components/Pages/ReadingLogPage';
import ProgressNotesPage from './components/Pages/ProgressNotesPage';
import ExtracurricularsPage from './components/Pages/ExtracurricularsPage';
import FieldTripsPage from './components/Pages/FieldTripsPage';
import ExpensesPage from './components/Pages/ExpensesPage';
import PortfolioPage from './components/Pages/PortfolioPage';
import ReflectionPage from './components/Pages/ReflectionPage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PlannerProvider>
      <AccessGate>
        <HashRouter>
          <div className="flex h-screen overflow-hidden bg-cream font-[Poppins]">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col overflow-y-auto">
              <Navigation onMenuClick={() => setSidebarOpen(true)} />
              <main className="flex-1">
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
              </main>
            </div>
          </div>
        </HashRouter>
      </AccessGate>
    </PlannerProvider>
  );
}
