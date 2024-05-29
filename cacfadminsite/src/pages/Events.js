// Libraries
import { Component } from 'react';

// Assets
import addbutton from "./../assets/addBtn_trans.png"

// Components
import Modal from '../components/Modal';
import Service from "../components/Service";
import EventEdit from '../components/EventEdit';
import EventList from "../components/EventList";

class Events extends Component {
    state = {events: [], selectedItem: null, editType: "eventEdit", showModal: false};

    componentDidMount() {
        document.title = "Chi Alpha: Christian Fellowship | Events"
        this.getEvents();
    };

    getEvents = async () => {
        let response = await Service.getAllEvents();
        try{
            for(let i = 0; i < response.events.length; i++){
                if(response.events[i].updatedAt){
                    response.events[i].updatedAt = new Date(response.events[i].updatedAt).toLocaleString();
                }
            }
            this.setState({
                events: response.events
            });
        }catch (error){
            console.log(error);
        }
    };

    onItemSelect = (type, item) =>{
        // console.log(item);
        this.setState({editType: type});
        this.setState({selectedItem: item});
    }

    handleModalToggle = (event) => {
        this.setState({showModal: event});
        if(!event){
            this.setState({selectedItem: {}})
        }
    }

    onSubmit = async (type, item) =>{
        if(type == "eventEdit"){
            await Service.editEvent(item.id, {title: item.title, description: item.description});
        }else if(type == "eventNew"){
            await Service.postNewEvent(item);
        }else if(type == "questionEdit"){
            await Service.editQuestion(item.id, {question: item.question});
        }else if(type =="questionNew"){
            await Service.postNewQuestion(item.id, {question: item.question});
        }else if(type =="eventDel"){
            await Service.deleteEvent(item.id);
        }
        window.location.reload();
    }
    render(){
        let renderObj;
        if (this.state.events){
            renderObj =<EventList items={this.state.events} onItemSelect={this.onItemSelect} modalToggle={this.handleModalToggle} />
        }else{
            renderObj = <p className="listError">Unable to get information from database</p>
        } 
        return (
            <div className="container">
                <h1 className="title">Events</h1>
                <hr />
                {renderObj}
                {this.state.showModal ? <Modal show={this.state.showModal} handleClose={this.handleModalToggle} children={<EventEdit item={this.state.selectedItem} editType={this.state.editType} onSubmit={this.onSubmit} />}  /> : null}
                <img src={addbutton} id="addButton" alt="Add New" onClick={() => {this.handleModalToggle(true);  this.onItemSelect("eventNew", {title: "", description: ""})}} />
            </div>
        )
    }
}

export default Events;