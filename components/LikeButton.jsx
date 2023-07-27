import React from 'react';

const LikeButton = ({ projectId, likes, onLike }) => {
  const handleLike = () => {
    onLike(projectId);
  };

  return (
    <div className="flex items-center mr-4">
      <button
        className="flex items-center text-gray-600 hover:text-gray-800"
        onClick={handleLike}
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        {likes}
      </button>
    </div>
  );
};

export default LikeButton;