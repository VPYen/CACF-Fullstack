// Libraries
import React from 'react';

class AnnouncementNew extends React.Component{
    constructor(props){
        super(props);
        // console.log("Edit props",this.props);
        this.state = {
                subject: "",
                description: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit = (event) =>{
        event.preventDefault();
        console.log("submit", this.state.subject, this.state.description)
        this.props.onSubmit(this.state.subject, this.state.description)
    }

    render(){
        return (
            <div className="editForm">
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="subject">Subject</label>
                        <input type="textarea" id="announceSubject" name="subject" value={this.state.subject} onChange={this.handleChange} />
                    <label htmlFor="description">Description</label>
                        <input type="textarea" id="announceDesc" name="description" value={this.state.description} onChange={this.handleChange} />
                    <button type="submit" value="Submit" >Submit</button>
                </form>
            </div>
        )
    }
};

export default AnnouncementNew;