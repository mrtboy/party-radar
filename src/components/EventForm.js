import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import Map from './Map';
import { connect } from 'react-redux';

const now = moment();


class EventForm extends React.Component {
  constructor(props) {
    super(props);



    this.state = {
      title: props.event ? props.event.title : '',
      eventDate: props.event ? moment(props.event.eventDate) : moment(),
      startTime: props.event ? props.event.startTime : moment(),
      endTime: props.event ? props.event.endTime : moment(),
      createdAt: props.event ? props.event.createdAt : now,
      type: props.event ? props.event.type : '',
      description: props.event ? props.event.description : '',
      themeClothes: props.event ? props.event.themeClothes : '',
      place_id: props.event ? props.event.place_id : '',
      address: props.event ? props.event.address : '',
      locationName: props.event ? props.event.locationName : '',
      geolocation: props.event ? props.event.geolocation : {},
      calendarFocused: null
    };
  }

  //#region  OnChange Value
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onTypeChange = (e) => {
    const type = e.target.value;
    this.setState(() => ({ type }));
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onThemeChange = (e) => {
    const themeClothes = e.target.value;
    this.setState(() => ({ themeClothes }));
  };

  onStreeChange = (e) => {
    const street = e.target.value;
    this.setState(() => ({ street }));
  };

  onStreeNumberChange = (e) => {
    const streetNo = e.target.value;
    this.setState(() => ({ streetNo }));
  };

  onPlzChange = (e) => {
    const plz = e.target.value;
    this.setState(() => ({ plz }));
  };

  onCityChange = (e) => {
    const city = e.target.value;
    this.setState(() => ({ city }));
  };

  onCountryChange = (e) => {
    const country = e.target.value;
    this.setState(() => ({ country }));
  };

  onDateChange = (eventDate) => {
    if (eventDate) {
      this.setState(() => ({ eventDate }));
    }

  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onAddressChange = (e) => {
    const address = e.target.value;
    this.setState(() => ({ address }));
  }
 //#endregion

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.title && !!this.state.geolocation.lat ) {
      this.setState(() => ({
        error: 'Please provide Title of party and real location.'
      }))
    } else {
      this.setState(() => ({ error: '' }))
      this.props.onSubmit({
        title: this.state.title,
        eventDate: this.state.eventDate.valueOf(),
        startTime: this.state.startTime.valueOf(),
        endTime: this.state.endTime.valueOf(),
        createdAt: this.state.createdAt.valueOf(),
        type: this.state.type,
        description: this.state.description,
        themeClothes: this.state.themeClothes,
        place_id: this.props.map.place_id,
        address: this.props.map.address,
        locationName: this.props.map.locationName,
        geolocation: this.props.map.geolocation,
      })
    }
  }


  render() {
    return (
      <div className="content-container">
        <form onSubmit={this.onSubmit} className="form">
          <input className="text-input" placeholder="Party Title" type="text" onChange={this.onTitleChange} value={this.state.title} />
                 <SingleDatePicker
          date={this.state.eventDate}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}//chech days availability
        />

          <input type="text" className="text-input" placeholder="Type of Party" onChange={this.onTypeChange} value={this.state.type} />
          <textarea type="text" className="text-area" placeholder="Description" onChange={this.onDescriptionChange} value={this.state.description} />
          <input type="text" className="text-input" placeholder="Theme Clothes" onChange={this.onThemeChange} value={this.state.themeClothes} />
          <input type="text" className="text-input" placeholder="Location Name" value={this.props.map.locationName} disabled />
  
          <div>
            {!!this.state.title && !!this.props.map.locationName ? <button className="button-add" > Save Event </button> :
                <p>Please Enter Title and Address from map for Event.</p>}
          </div>
        </form>
        <Map event={this.props.event} autoComplete={true}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  map: state.map
});


export default connect(mapStateToProps)(EventForm);
