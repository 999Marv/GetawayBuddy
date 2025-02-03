export const Placeholder = () => {
  return Array(3)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="bg-white rounded-lg p-4 shadow animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    ));
};
