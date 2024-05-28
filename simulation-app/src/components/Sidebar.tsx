import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const items = ['Product', 'Source', 'Queue', 'Server', 'Sink', 'Node'];

  return (
    <div className="sidebar">
      {items.map(item => (
        <div
          key={item}
          className="sidebar-item"
          draggable
          onDragStart={e => e.dataTransfer.setData('application/reactflow', item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;