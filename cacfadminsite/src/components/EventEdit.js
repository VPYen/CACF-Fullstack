// Libraries
import React from 'react';

class EventEdit extends React.Component{
    constructor(props){
        super(props);
        // console.log("Edit props",this.props);
        if ("title" in props.item) {
            this.state = {
                title: props.item.title,
                description: props.item.description
            }
        }else{
            this.state = {
                question: props.item.question
            }
            // console.log(props.item);
            // console.log(props.item.question.responses);
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit = (event) =>{
        event.preventDefault();
        if (this.props.editType == "eventEdit"){
            // console.log("submit", this.state.title, this.state.description);
            this.props.onSubmit(this.props.editType, {id: this.props.item._id, title: this.state.title, description: this.state.description});
        }else if(this.props.editType == "eventNew"){
            // console.log("submit", this.state.title, this.state.description);
            this.props.onSubmit(this.props.editType, {title: this.state.title, description: this.state.description});
        }else if (this.props.editType == "questionEdit"){
            // console.log("submit", this.state.question);
            this.props.onSubmit(this.props.editType, {id: this.props.item._id, question: this.state.question});
        }else if (this.props.editType == "questionNew"){
            // console.log("submit", this.state.question);
            this.props.onSubmit(this.props.editType, {id: this.props.item._id, question: this.state.question});
        }else if (this.props.editType == "eventDel"){
            this.props.onSubmit(this.props.editType, {id: this.props.item._id});
        }
    }
    
    render(){
        let form;
        let responses;

        if (this.props.item){
            if (this.props.editType == "eventEdit" || this.props.editType == "eventNew"){
                let labelT;
                let labelD;
                {this.props.editType == "eventEdit" ? labelT = "Edit Title" : labelT = "Add Event Title"}
                {this.props.editType == "eventEdit" ? labelD = "Edit Description" : labelD = "Add Event Description"}
                form = <form onSubmit={this.onSubmit}>
                            <label htmlFor="eventTitle">{labelT}</label>
                        <div className="formInput">
                            <input type="textarea" id="eventTitle" name="title" value={this.state.title} onChange={this.handleChange} />
                        </div>
                            <label htmlFor="eventDesc">{labelD}</label>
                        <div className="formInput">
                            <textarea id="eventDesc" name="description" value={this.state.description} onChange={this.handleChange} />
                        </div>
                            <button type="submit" className="submitButton" >Submit</button>
                        </form>
            }else if (this.props.editType == "questionEdit" || this.props.editType == "questionNew"){
                if (this.props.editType == "questionEdit") {
                    let rArray = this.props.item.responses;
                    if (rArray.length > 0){
                        for(let i = 0; i < rArray.length; i++){
                            if(rArray[i].updatedAt){
                                rArray[i].updatedAt = new Date(rArray[i].updatedAt).toLocaleString();
                            }
                        }
                        responses = <table><thead><th>Name</th><th>Response</th><th>Last Updated</th></thead> {rArray.map(response => {return <tr key={response._id}><td>{response.name}</td><td>{response.answer}</td><td>{response.updatedAt}</td></tr>})}</table>
                    }else{
                        responses = <p className="noRespMsg">Currently no responses to this question</p>
                    }
                }else {
                    responses = <></>
                }
                let label;
                {this.props.editType == "questionEdit" ? label = "Edit Question" : label = "Add Question"}
                form =  <form onSubmit={this.onSubmit}>
                            <label htmlFor="eventQuestion">{label}</label>
                            <div className="formInput">
                                <textarea id="eventQuestion" name="question" value={this.state.question} onChange={this.handleChange} />
                                <button type="submit" className="submitButton" >Submit</button>
                            </div>
                        </form>
            }else if (this.props.editType == "eventDel"){
                form = <div>
                        <h3>Event Title:<p>{this.state.title}</p></h3>
                        <h3>Event Description: <p>{this.state.description}</p></h3>
                        <p>Are you sure you want to delete this event?</p>
                        <button className="submitButton" onClick={this.onSubmit}>Delete</button>
                       </div>
            }
        }else{
            form = <p className="listError">Item not available for editing</p>
        }
        return (
            <div className="outerForm">
                <div className="editForm">
                    {form}
                </div>
                    {responses}
            </div>
        )
    }
};

export default EventEdit;