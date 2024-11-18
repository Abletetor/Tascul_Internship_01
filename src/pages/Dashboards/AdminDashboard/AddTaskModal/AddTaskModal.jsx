/* eslint-disable react/prop-types */
import { useState } from 'react';
import './AddTaskModal.scss';

const AddTaskModal = ({ onClose, internId }) => {
   const [task, setTask] = useState({ title: '', description: '', dueDate: '' });

   const handleChange = (e) => {
      setTask({ ...task, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/admin/addTask`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ ...task, internId }),
         });

         if (response.ok) {
            onClose();
         } else {
            console.error('Failed to add task');
         }
      } catch (error) {
         console.error('Error:', error);
      }
   };

   return (
      <div className="modal-overlay">
         <div className="modal-content">
            <h3>Add New Task</h3>
            <form onSubmit={ handleSubmit }>
               <label>Title</label>
               <input name="title" value={ task.title } onChange={ handleChange } required />

               <label>Description</label>
               <textarea name="description" value={ task.description } onChange={ handleChange } required />

               <label>Due Date</label>
               <input type="date" name="dueDate" value={ task.dueDate } onChange={ handleChange } required />

               <div className="button-group">
                  <button type="submit" className="submit-button">Add Task</button>
                  <button type="button" className="cancel-button" onClick={ onClose }>Cancel</button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddTaskModal;
