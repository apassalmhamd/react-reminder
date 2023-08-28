import React,{Component} from "react";
import { add_Reminder, remove_Reminder ,clear_reminder} from "../actions";
import {  connect } from "react-redux";
import moment from 'moment';
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from './img1.jpg'
class App extends Component{
    state={
        text:'',
        date: new Date()
    }
    render_Reminders=()=>{
        const {reminders}=this.props;
        return(
            <ul className="list-group">
            {
                reminders.map(reminder=>{
                    return(
                        <li className="list-group-item">
                        <div>{reminder.text}</div>
                        <div>{moment(new Date(reminder.date)).fromNow()}</div>
                        <div className="closeIcon  btn btn-danger" onClick={()=> this.props.remove_Reminder(reminder.id)}>X</div>
                        </li>
                    )
                })
            }
            </ul>
        )
        
    }
    
    render(){
    
        return(
            <div className="App">
                <img src={logo} />
                <div className="reminder-title">
                    <h2> What Should U Do ?</h2>
                </div>
                <input 
                value={this.state.text}
                onChange={(e)=> this.setState({text:e.target.value})}
                className="form-control"
                type="text"
                placeholder="Enter What U think ....?"
                />
            
                <Datepicker
                className="form-control"
                value={this.state.date}
                placeholderText="Enter Date"
                selected={this.state.date}
                onChange={(date)=>{this.setState({date:date})}}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MMM d,yyyy h:mm aa"
                timeCaption="time"
                />
                <button 
                onClick={()=> {
                    this.props.add_Reminder(this.state.text, this.state.date)
                    this.setState({text:'',date:''})
                }}
                className="btn btn-primary btn-block w-100">Add Reminder</button>
                {this.render_Reminders()}
                <button 
                onClick={()=> this.props.clear_reminder()}
                className="btn btn-danger w-100">Clear Reminder</button>
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch){
//     return{
//         add_Reminder:()=> dispatch(add_Reminder())
//     }
// }
// function mapStateToProps(state){
//     return{
//         reminders: state
//     }
// }
export default connect(state=>{
return{
    reminders: state
}
},{add_Reminder,remove_Reminder ,clear_reminder}) (App)