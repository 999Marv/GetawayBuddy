export const Placeholder = () => {
  return (
    <div className="w-full lg:w-2/3">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-200 rounded-lg w-12 h-12"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="p-3 bg-gray-200 rounded-lg w-12 h-12"></div>
        </div>
        <div className="p-6 space-y-4">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="border-l-4 border-gray-200 pl-6 space-y-2"
              >
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-28"></div>
              </div>
            ))}
          <div className="h-4 bg-gray-200 rounded w-40"></div>
        </div>
      </div>
    </div>
  );
};
