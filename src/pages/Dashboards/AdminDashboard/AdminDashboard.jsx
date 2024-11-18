import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import './AdminDashboard.scss';
import ProjectShowcase from './ProjectShowcase/ProjectShowcase';
import ReviewSystem from './ReviewSystem/ReviewSystem';
import { FaSignOutAlt, FaPlus, FaTasks, FaClipboardList } from 'react-icons/fa';
import AddTaskModal from '../AdminDashboard/AddTaskModal/AddTaskModal';

const AdminDashboard = () => {
   const { theme } = useContext(ThemeContext);
   const [projects, setProjects] = useState([]);
   const [reviews, setReviews] = useState([]);
   const [interns, setInterns] = useState([]);
   const [selectedInternId, setSelectedInternId] = useState('');
   const [activeSection, setActiveSection] = useState('projects');
   const [error, setError] = useState(null);
   const [showTaskModal, setShowTaskModal] = useState(false);

   // Fetch data when the component mounts
   useEffect(() => {
      const fetchData = async () => {
         try {
            const token = localStorage.getItem('token');

            // Fetch projects and reviews
            const projectResponse = await fetch(`${import.meta.env.VITE_APP_URL}/api/admin/projects`, {
               headers: {
                  'Authorization': `Bearer ${token}`,
               },
            });
            const reviewResponse = await fetch(`${import.meta.env.VITE_APP_URL}/api/admin/reviews`, {
               headers: {
                  'Authorization': `Bearer ${token}`,
               },
            });

            if (!projectResponse.ok || !reviewResponse.ok) {
               throw new Error('Failed to fetch data. Please try again later.');
            }

            const projectData = await projectResponse.json();
            const reviewData = await reviewResponse.json();
            setProjects(projectData);
            setReviews(reviewData);

            // Fetch interns
            const internResponse = await fetch(`${import.meta.env.VITE_APP_URL}/api/admin/interns`, {
               headers: {
                  'Authorization': `Bearer ${token}`,
               },
            });

            if (!internResponse.ok) {
               throw new Error('Failed to fetch interns.');
            }

            const internData = await internResponse.json();
            setInterns(internData);
         } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
         }
      };

      fetchData();
   }, []);

   const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.href = '/login';
   };

   const handleOpenTaskModal = () => {
      if (selectedInternId) {
         setShowTaskModal(true);
      } else {
         alert('Please select an intern first.');
      }
   };

   const handleCloseTaskModal = () => setShowTaskModal(false);

   return (
      <div className={ `admin-dashboard ${theme === 'dark' ? 'darkmode' : ''}` }>
         {/* Sidebar */ }
         <aside className="sidebar">
            <h2>Admin Dashboard</h2>
            <button
               className={ `sidebar-btn ${activeSection === 'projects' ? 'active' : ''}` }
               onClick={ () => setActiveSection('projects') }
            >
               <FaPlus /> Add Project
            </button>
            <button
               className={ `sidebar-btn ${activeSection === 'reviews' ? 'active' : ''}` }
               onClick={ () => setActiveSection('reviews') }
            >
               <FaTasks /> Review System
            </button>

            {/* Add Task Button */ }
            <button
               className="sidebar-btn"
               onClick={ handleOpenTaskModal }
            >
               <FaClipboardList /> Add Task
            </button>

            {/* Intern Selection Dropdown */ }
            <select onChange={ (e) => setSelectedInternId(e.target.value) } value={ selectedInternId }>
               <option value="">Select an Intern</option>
               { interns.map((intern) => (
                  <option key={ intern._id } value={ intern._id }>
                     { intern.name } ({ intern.internId })
                  </option>
               )) }
            </select>

            <button className="logout-btn" onClick={ handleLogout }>
               <FaSignOutAlt /> Logout
            </button>
         </aside>

         <main className="dashboard-content">
            { error && <div className="error-message">{ error }</div> }
            { activeSection === 'projects' ? (
               <ProjectShowcase projects={ projects } setProjects={ setProjects } />
            ) : (
               <ReviewSystem reviews={ reviews } setReviews={ setReviews } />
            ) }

            {/* Show the task modal if it is open */ }
            { showTaskModal && <AddTaskModal internId={ selectedInternId } onClose={ handleCloseTaskModal } /> }
         </main>
      </div>
   );
};

export default AdminDashboard;
