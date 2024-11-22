/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProjectForm from './ProjectForm';
import { ThemeContext } from '../../../../context/ThemeContext';
import './ProjectShowcase.scss';

const ProjectShowcase = ({ projects, setProjects }) => {
   const [projectFormVisible, setProjectFormVisible] = useState(false);
   const { theme } = useContext(ThemeContext);

   useEffect(() => {
      const fetchProjects = async () => {
         try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/admin/projects`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            setProjects(response.data);
         } catch (error) {
            console.error('Error fetching projects:', error);
         }
      };

      fetchProjects();
   }, [setProjects]);

   const handleProjectSubmit = async (project) => {
      try {
         const token = localStorage.getItem('token');
         const response = await axios.post(
            `${import.meta.env.VITE_APP_URL}/api/admin/projects`,
            project,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         setProjects((prev) => [response.data, ...prev]);
         setProjectFormVisible(false);
      } catch (error) {
         console.error('Error adding project:', error);
      }
   };

   return (
      <section className={ `project-showcase ${theme === 'dark' ? 'dark' : ''}` }>
         <h3>Projects</h3>
         <button
            className="toggle-form"
            onClick={ () => setProjectFormVisible((prev) => !prev) }
         >
            { projectFormVisible ? 'Close Form' : 'Add New Project' }
         </button>

         { projectFormVisible ? (
            <ProjectForm onSubmit={ handleProjectSubmit } />
         ) : (
            <div className="projects-list">
               { projects.length === 0 ? (
                  <div className="no-projects-message">
                     <p>No projects available at the moment. Please add a new project.</p>
                  </div>
               ) : (
                  projects.map((project, index) => (
                     <div className="project-card" key={ index }>
                        <img
                           src={ `${import.meta.env.VITE_APP_URL}/${project.thumbnail}` }
                           alt={ `${project.projectName} Thumbnail` }
                        />
                        <h4>{ project.projectName }</h4>
                        <p>{ project.description }</p>
                        <div className="project-links">
                           <a href={ project.liveLink } target="_blank" rel="noopener noreferrer">
                              Live Project
                           </a>
                           <a href={ project.githubLink } target="_blank" rel="noopener noreferrer">
                              GitHub Repository
                           </a>
                        </div>
                     </div>
                  ))
               ) }
            </div>
         ) }
      </section>
   );
};

export default ProjectShowcase;
