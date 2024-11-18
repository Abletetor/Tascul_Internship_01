import { useEffect, useState, useContext } from 'react';
import { FaUserTie, FaClock, FaTasks, FaSignOutAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { ThemeContext } from '../../../context/ThemeContext';
import axios from 'axios';
import './InternDashboard.scss';

const InternDashboard = () => {
   const [internName, setInternName] = useState('');
   const [internshipDetails, setInternshipDetails] = useState({
      role: '',
      duration: '',
      tasks: [],
   });
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const { theme } = useContext(ThemeContext);

   useEffect(() => {
      const fetchInternDetails = async () => {
         try {
            const token = localStorage.getItem('token');
            if (!token) {
               window.location.href = '/login';
               return;
            }

            const config = {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            };

            //fetch intern details
            const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/intern/details`, config);

            setInternName(response.data.name);
            setInternshipDetails({
               role: response.data.role,
               duration: response.data.duration,
               tasks: response.data.tasks,
            });
         } catch (error) {
            setError('Failed to load intern details. Please try again.');
            console.error('Error fetching intern details:', error);
         } finally {
            setLoading(false);
         }
      };

      fetchInternDetails();
   }, []);

   const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
   };

   if (loading) {
      return <div>Loading intern details...</div>;
   }
   if (error) {
      return <div>{ error }</div>;
   }

   return (
      <div className={ `intern-dashboard ${theme === 'dark' ? 'darkmode' : ''}` }>
         <h2>Welcome on Board, <span className="intern-name">{ internName }</span>!</h2>
         <div className="intern-dashboard__cards">
            <div className={ `card top-card ${theme === 'dark' ? 'darkmode' : ''}` }>
               <FaUserTie className="card-icon" />
               <h3>Role</h3>
               <p>{ internshipDetails.role }</p>
            </div>
            <div className={ `card top-card ${theme === 'dark' ? 'darkmode' : ''}` }>
               <FaClock className="card-icon" />
               <h3>Duration</h3>
               <p>{ internshipDetails.duration }</p>
            </div>
            <div className={ `card bottom-card ${theme === 'dark' ? 'darkmode' : ''}` }>
               <FaTasks className="card-icon" />
               <h3>Assigned Tasks</h3>
               <ul className="task-list">
                  { internshipDetails.tasks.length > 0 ? (
                     internshipDetails.tasks.map((task, index) => (
                        <li key={ index } className={ `task-item ${theme === 'dark' ? 'darkmode' : ''}` }>
                           <h3>{ task.title }</h3>
                           <p><strong>Description:</strong> { task.description }</p>
                           <p><strong>Deadline:</strong> { task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline' }</p>
                           <p>
                              <strong>Status:</strong> { task.isCompleted ? (
                                 <span className="task-completed"><FaCheckCircle /> Completed</span>
                              ) : (
                                 <span className="task-pending"><FaTimesCircle /> Pending</span>
                              ) }
                           </p>
                        </li>
                     ))
                  ) : (
                     <p>No tasks assigned yet.</p>
                  ) }
               </ul>
            </div>
         </div>
         <button className="logout-btn" onClick={ handleLogout }>
            <FaSignOutAlt /> Logout
         </button>
      </div>
   );
};

export default InternDashboard;
