// Libraries
import React from 'react';

class AnnouncementEdit extends React.Component{
    constructor(props){
        super(props);
        // console.log("Edit props",this.props);
        this.state = {
                subject: props.item.subject,
                description: props.item.description
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit = (event) =>{
        event.preventDefault();
        // console.log("submit", this.state.subject, this.state.description)
        if(this.props.editType == "edit"){
            this.props.onSubmit(this.props.editType, {id: this.props.item._id, subject: this.state.subject, description: this.state.description})
        }else if(this.props.editType == "new"){
            this.props.onSubmit(this.props.editType, {subject: this.state.subject, description: this.state.description})
        }else if(this.props.editType == "del"){
            this.props.onSubmit(this.props.editType, {id: this.props.item._id})
        }
    }

    render(){
        let form;
        let labelS;
        let labelD;
        if (this.props.item){
            if (this.props.editType == "edit" || this.props.editType == "new"){
                {this.props.editType == "edit" ? labelS = "Edit Subject" : labelS = "Add Announcement Subject"}
                {this.props.editType == "edit" ? labelD = "Edit Description" : labelD = "Add Announcement Description"}
                form = <form onSubmit={this.onSubmit}>
                        <label htmlFor="subject">{labelS}</label>
                    <div className="formInput">
                        <input type="textarea" id="announceSubject" name="subject" value={this.state.subject} onChange={this.handleChange} />
                    </div>
                        <label htmlFor="description">{labelD}</label>
                    <div className="formInput">
                        <textarea id="announceDesc" name="description" value={this.state.description} onChange={this.handleChange} />
                    </div>
                        <button type="submit" className="submitButton" >Submit</button>
                    </form>
            }else if (this.props.editType == "del"){
                form = <div>
                        <h3>Announcement Subject:<p>{this.state.subject}</p></h3>
                        <h3>Announcement Description: <p>{this.state.description}</p></h3>
                        <p>Are you sure you want to delete this event?</p>
                        <button className="submitButton" onClick={this.onSubmit}>Delete</button>
                       </div>
            }
        }else{
            form = <p className="listError">Item not available for editing</p>
        }
        return (
            <div className="editForm">
                {form}
            </div>
        )
    }
};

export default AnnouncementEdit;