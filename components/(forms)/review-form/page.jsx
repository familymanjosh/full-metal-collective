import { useState } from "react";

const HandleReviewPage = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission and save the review
  };

  return (
    <div className="bg-blue-200 min-h-screen flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-4">Submit a Review</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="rating" className="block font-medium text-gray-700">
              Rating:
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="comment" className="block font-medium text-gray-700">
              Comment:
            </label>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitReviewPage;
