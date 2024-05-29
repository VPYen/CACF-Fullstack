// Libraries
import { Component }from 'react';

// Assets
import addbutton from "./../assets/addBtn_trans.png"

// Components
import Modal from '../components/Modal';
import Service from "../components/Service";
import AnnouncementNew from '../components/AnnnouncementNew';
import AnnouncementEdit from '../components/AnnouncementEdit';
import AnnouncementList from "../components/AnnouncementList";

class Announcements extends Component {
    state = {announcements: [], selectedItem: {}, showModal: false, editType: "edit", loggedIn: this.props.loggedIn};

    componentDidMount() {
        document.title = "Chi Alpha: Christian Fellowship | Announcements"
        this.getAnnouncements()
    };

    getAnnouncements = async () => {
        let response = await Service.getAllAnnouncements();
        try{
            for(let i = 0; i < response.announcements.length; i++){
                if(response.announcements[i].updatedAt){
                    response.announcements[i].updatedAt = new Date(response.announcements[i].updatedAt).toLocaleString();
                }
            }
            this.setState({
                announcements: response.announcements
            });
        }catch (error){
            console.log(error);
        }
    };

    onItemSelect = (type, item) => {
        this.setState({editType: type});
        this.setState({selectedItem: item});
    };

    handleModalToggle = (event) => {
        this.setState({showModal: event})
        if(!event){
            this.setState({selectedItem: {}})
        }
    }

    onSubmit = async (type, item) =>{
        if (type == "edit"){
            await Service.editAnnouncement(item.id, item);
        }else if (type =="new"){
            await Service.postNewAnnouncement(item);
        }else if (type == "del"){
            await Service.deleteAnnouncement(item.id);
        }
        window.location.reload();
    }

    render(){
        let renderObj;
        if (this.state.announcements){
            renderObj =  <AnnouncementList items={this.state.announcements} onItemSelect={this.onItemSelect} modalToggle={this.handleModalToggle} />
        }else{
            renderObj = <p className="listError">Unable to get information from database</p>
        }
        return (
            <div className="container">
                <h1 className="title">Announcements</h1>
                <hr />
                {renderObj}
                {this.state.showModal ? <Modal show={this.state.showModal} handleClose={this.handleModalToggle} children={<AnnouncementEdit onSubmit={this.onSubmit} editType={this.state.editType} item={this.state.selectedItem} />} /> : null}
                <img src={addbutton} id="addButton" alt="Add New" onClick={() => {this.handleModalToggle(true); this.onItemSelect("new", {subject: "", description: ""})}} />
            </div>
        )
    }
}

export default Announcements;