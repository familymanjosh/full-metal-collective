import React, { useState } from 'react';

const CommentSection = ({ projectId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() !== '') {
      setComments((prevComments) => [
        ...prevComments,
        {
          id: Date.now(),
          projectId,
          content: comment,
        },
      ]);
      setComment('');
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={handleCommentChange}
          className="rounded-md border-gray-300 px-3 py-2 mr-2 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Comment
        </button>
      </form>
      <ul className="mt-4">
        {comments.map((comment) => (
          <li key={comment.id} className="text-gray-600">
            {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
