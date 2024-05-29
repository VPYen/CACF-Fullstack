// Libraries
import React from 'react';

class EventItem extends React.Component {
    constructor(props){
        super(props);
        // console.log(props)
    }

    render(){
        return (
            <tr>
                <td className="tdTitle">
                    <a onClick={() => {
                        this.props.onItemSelect("eventEdit", this.props.item);
                        this.props.modalToggle(true);
                        }}>
                    {this.props.item.title}
                    </a>
                </td>
                <td className="tdDesc">{this.props.item.description}</td>
                <td className="tdQuests">
                    <div className="tdQElement">
                        {this.props.item.questions.map((question) => {
                            return <a key={question._id} 
                                      onClick={() => {this.props.onItemSelect("questionEdit", question);
                                      this.props.modalToggle(true)}} >
                                      {question.question}
                                    </a>
                        })}
                    </div>
                    <div className="tdQElement">
                        <button id="addNewQ" onClick={() => {
                            this.props.onItemSelect("questionNew", {_id: this.props.item._id, question: ""});
                            this.props.modalToggle(true)
                        }}>
                        Add Question
                        </button>
                    </div>
                </td>
                <td className="tdDate">{this.props.item.updatedAt}</td>
                <td className="tdDel">
                    <a onClick={() => {
                                        this.props.onItemSelect("eventDel", this.props.item)
                                        this.props.modalToggle(true);
                                      }}>
                    Delete</a>
                </td>
            </tr>
        )
    }
}

export default EventItem;