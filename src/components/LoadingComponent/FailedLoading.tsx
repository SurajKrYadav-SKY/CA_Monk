import React from "react";

type FailedLoadingProps = {
  error: string;
};

const FailedLoading: React.FC<FailedLoadingProps> = ({ error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full shadow-md text-center">
        <div className="text-red-500 text-4xl mb-2">⚠️</div>
        <h2 className="text-lg font-semibold text-red-700 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-sm text-red-600 mb-4">
          {error || "We couldn't load the data. Please try again."}
        </p>
        <p className="text-sm text-red-600 mb-4">
          Please setup your db.json server. Follow the instructions in the
          README.md
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default FailedLoading;
