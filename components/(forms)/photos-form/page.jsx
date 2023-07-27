import React, { useState } from 'react';

const PhotosForm = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create form data object
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', caption);
    formData.append('userId', userId);

    try {
      // Send POST request to backend
      const response = await fetch('/api/photos', {
        method: 'POST',
        body: formData,
      });

      // Handle response from backend
      if (response.ok) {
        console.log('Photo uploaded successfully');
        // Add your logic to handle the successful upload or show a success message
      } else {
        console.error('Error uploading photo:', response.status);
        // Add your logic to handle the error or show an error message
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      // Add your logic to handle the error or show an error message
    }

    // Clear the form
    setFile(null);
    setCaption('');
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Add Photo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="file" className="block font-medium">
            Photo:
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="caption" className="block font-medium">
            Caption:
          </label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={handleCaptionChange}
            className="border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PhotosForm;
