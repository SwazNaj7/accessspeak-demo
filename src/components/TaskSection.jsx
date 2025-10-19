import React from 'react';
import './TaskSection.css';

const TaskSection = ({ tasks, onTaskUpdate, onNewTask }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      in_progress: '#3b82f6',
      completed: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getUrgencyIcon = (urgency) => {
    const icons = {
      low: '🟢',
      normal: '🟡',
      high: '🟠',
      urgent: '🔴'
    };
    return icons[urgency] || '⚪';
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    onTaskUpdate(updatedTasks);
    localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="task-section">
      <div className="section-header">
        <h2>📋 Your Tasks & Requests</h2>
        <button className="btn-add-task" onClick={onNewTask}>
          + New Request
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-tasks">
          <p>🎉 No active requests. Click "New Request" to get started!</p>
        </div>
      ) : (
        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <span className="task-urgency">{getUrgencyIcon(task.urgency)}</span>
                <span className="task-type">{task.taskType}</span>
                <span 
                  className="task-status"
                  style={{ background: getStatusColor(task.status) }}
                >
                  {task.status.replace('_', ' ')}
                </span>
              </div>
              
              <p className="task-description">{task.description}</p>
              
              {task.location && (
                <div className="task-location">
                  📍 {task.location}
                </div>
              )}
              
              <div className="task-actions">
                {task.status === 'pending' && (
                  <button onClick={() => updateTaskStatus(task.id, 'cancelled')}>
                    Cancel
                  </button>
                )}
                {task.status === 'in_progress' && (
                  <button onClick={() => updateTaskStatus(task.id, 'completed')}>
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskSection;