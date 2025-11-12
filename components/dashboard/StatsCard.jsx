
const StatsCard = ({ title, value, icon, description, className = '' }) => {
  return (
    <div className={`card bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm ${className}`}>
      <div className="card-body p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-slate-600">{title}</h3>
            <p className="text-2xl font-bold mt-1 text-slate-800">{value}</p>
            {description && (
              <p className="text-xs text-slate-500 mt-1">{description}</p>
            )}
          </div>
          <div className="text-blue-600">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;