export default function PageWrapper({ children, title, description, actions }) {
  return (
    <div className="animate-fade-in w-full h-full p-4 sm:p-6 lg:p-8 flex justify-center">
      <article id="planner-content" className="w-full max-w-5xl pb-20">
        
        {/* Page Header (Linear Style) */}
        {(title || actions) && (
          <div className="mb-8 border-b border-light-gray/60 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                {title && (
                  <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1.5 text-sm text-medium-gray">
                    {description}
                  </p>
                )}
              </div>
              
              {actions && (
                <div className="flex items-center gap-2">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="space-y-6">
          {children}
        </div>
      </article>
    </div>
  );
}
