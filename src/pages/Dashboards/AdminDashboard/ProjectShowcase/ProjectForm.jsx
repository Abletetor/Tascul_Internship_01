/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import './ProjectForm.scss';

const ProjectForm = ({ onSubmit }) => {
   const [projectData, setProjectData] = useState({
      projectName: '',
      description: '',
      thumbnail: null,
      liveLink: '',
      githubLink: '',
   });
   const [successMessage, setSuccessMessage] = useState('');
   const { theme } = useContext(ThemeContext);

   const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === 'thumbnail') {
         setProjectData((prev) => ({ ...prev, thumbnail: files[0] }));
      } else {
         setProjectData((prev) => ({ ...prev, [name]: value }));
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('projectName', projectData.projectName);
      formData.append('description', projectData.description);
      formData.append('thumbnail', projectData.thumbnail);
      formData.append('liveLink', projectData.liveLink);
      formData.append('githubLink', projectData.githubLink);

      onSubmit(formData);

      // Display success message & Reset form fields
      setSuccessMessage('Project added successfully!');
      setProjectData({ projectName: '', description: '', thumbnail: null, liveLink: '', githubLink: '' });

      // Remove success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
   };

   return (
      <form onSubmit={ handleSubmit } className={ `project-form ${theme === 'dark' ? 'dark' : ''}` }>
         <h3>Add a New Project</h3>

         { successMessage && <div className="alert success-alert">{ successMessage }</div> }

         <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={ projectData.projectName }
            onChange={ handleChange }
            required
         />
         <input
            type="text"
            name="description"
            placeholder="Project Description"
            value={ projectData.description }
            onChange={ handleChange }
            required
         />
         <input
            type="file"
            name="thumbnail"
            onChange={ handleChange }
            required
         />
         <input
            type="text"
            name="liveLink"
            placeholder="Live Project Link"
            value={ projectData.liveLink }
            onChange={ handleChange }
            required
         />
         <input
            type="text"
            name="githubLink"
            placeholder="GitHub Repository Link"
            value={ projectData.githubLink }
            onChange={ handleChange }
            required
         />
         <button type="submit">Add Project</button>
      </form>
   );
};

export default ProjectForm;
