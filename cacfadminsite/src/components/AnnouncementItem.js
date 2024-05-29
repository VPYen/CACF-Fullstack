// Libraries
import React from 'react';

class AnnouncementItem extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <tr>
                <td className="tdTitle">
                    <a onClick={() => {
                        this.props.onItemSelect("edit", this.props.item);
                        this.props.modalToggle(true);
                        }}>
                    {this.props.item.subject}
                    </a>
                </td>
                <td className="tdDesc">{this.props.item.description}</td>
                <td className="tdDate">{this.props.item.updatedAt}</td>
                <td className="tdDel">
                    <a onClick={() => {
                                        this.props.onItemSelect("del", this.props.item)
                                        this.props.modalToggle(true);
                                      }}>
                    Delete</a>
                </td>
            </tr>
        )
    }
}

export default AnnouncementItem;