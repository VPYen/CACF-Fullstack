// Libraries
import React from 'react';

// Components
import EventItem from './EventItem';

const EventList = ({items, onItemSelect, modalToggle}) => {
  let renderedList;

  if (items){
    renderedList = items.map(item => {
      return (
       <EventItem 
        key={item._id}
        onItemSelect={onItemSelect}
        item={item}
        modalToggle={modalToggle}
       />
    )
    });
  }else{
    renderedList = <p className="listError">Unable to obtain information from the database.</p>
  }
  return (
    <table className="listTable">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th className="thQuests">Questions</th>
          <th>Last Updated</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {renderedList}
      </tbody>
    </table>
  )
};

export default EventList;