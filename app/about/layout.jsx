import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;