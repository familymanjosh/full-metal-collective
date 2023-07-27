
const ProjectForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/projects', {
          title,
          description,
        });
        console.log(response.data); // Handle the response as needed
        // Reset form fields
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
    );
  };
  
  export default ProjectForm;
  