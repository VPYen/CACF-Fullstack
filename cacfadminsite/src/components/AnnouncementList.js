// Libraries
import React from 'react';

// Components
import AnnouncementItem from './AnnouncementItem';

const AnnouncementList = ({items, onItemSelect, modalToggle}) => {
  let renderObject;
  
  if (items){
    renderObject = items.map(item => {
      return (
        <AnnouncementItem
          key={item._id}
          onItemSelect={onItemSelect}
          item={item}
          modalToggle={modalToggle}
        />
      )
    });
  }else{
    renderObject = <p className="listError">Unable to obtain information from the database.</p>
  }
  return (
    <table className="listTable">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Description</th>
          <th>Last Updated</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {renderObject}
      </tbody>
    </table>
  )
};

export default AnnouncementList;