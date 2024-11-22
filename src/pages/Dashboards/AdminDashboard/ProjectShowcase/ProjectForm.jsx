/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProjectForm.scss';

const ProjectForm = ({ onSubmit }) => {
   const [projectData, setProjectData] = useState({
      projectName: '',
      description: '',
      thumbnail: null,
      liveLink: '',
      githubLink: '',
   });
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

      try {
         onSubmit(formData);
         toast.success('Project added successfully!');
         setProjectData({ projectName: '', description: '', thumbnail: null, liveLink: '', githubLink: '' });
      } catch (error) {
         toast.error('Failed to add project. Please try again.');
         console.error('Error adding project:', error);
      }
   };

   return (
      <form onSubmit={ handleSubmit } className={ `project-form ${theme === 'dark' ? 'dark' : ''}` }>
         <h3>Add a New Project</h3>

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
         <ToastContainer position="top-right" autoClose={ 3000 } style={ { zIndex: 100001 } } />
      </form>
   );
};

export default ProjectForm;
