import React from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import Map from './Map';
import { connect } from 'react-redux';

const now = moment();


class EventForm extends React.Component {
  constructor(props) {
    super(props);



    this.state = {
      title: props.event ? props.event.title : '',
      startDate: props.event ? moment(props.event.startDate) : moment(),
      endDate: props.event ? moment(props.event.endDate) : moment(),
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


  componentDidUpdate() {
    let map = this.props.map.map;
    let autocomplete = {};

    let infowindowContent = document.getElementById('infowindow-content');
    let input = document.getElementById('pac-input');

    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    let infowindow = new google.maps.InfoWindow();

    infowindow.setContent(infowindowContent);
    let marker = new google.maps.Marker({
      map: map
    });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });

    autocomplete.addListener('place_changed', function () {
      infowindow.close();
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }
 
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      // Set the position of the marker using the place ID and location.
      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location
      });
      marker.setVisible(true);
      this.setState(() => {
        return {
          locationName: place.name,
          place_id: place.place_id,
          address: place.formatted_address,
          geolocation: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        }
      });
    }.bind(this));

  }

  componentDidCatch(){
    window.google = {}
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

  onDatesChange = ({ startDate, endDate }) => {
    this.setState(() => ({
      startDate,
      endDate
    }))
  };
  
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }

  onAddressChange = (e) => {
    const address = e.target.value;
    this.setState(() => ({ address }));
  }
 //#endregion

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.title) {
      this.setState(() => ({
        error: 'Please provide Title of party and start and end date.'
      }))
    } else {
      this.setState(() => ({ error: '' }))
      this.props.onSubmit({
        title: this.state.title,
        startDate: this.state.startDate.valueOf(),
        endDate: this.state.endDate.valueOf(),
        startTime: this.state.startTime.valueOf(),
        endTime: this.state.endTime.valueOf(),
        createdAt: this.state.createdAt.valueOf(),
        type: this.state.type,
        description: this.state.description,
        themeClothes: this.state.themeClothes,
        place_id: this.state.place_id,
        address: this.state.address,
        locationName: this.state.locationName,
        geolocation: this.state.geolocation
      })
    }
  }


  render() {
    return (
      <div className="content-container">
        <form onSubmit={this.onSubmit} className="form">
          <input className="text-input" placeholder="Party Title" type="text" onChange={this.onTitleChange} value={this.state.title} />
          <DateRangePicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />

          <input type="text" className="text-input" placeholder="Type of Party" onChange={this.onTypeChange} value={this.state.type} />
          <textarea type="text" className="text-area" placeholder="Description" onChange={this.onDescriptionChange} value={this.state.description} />
          <input type="text" className="text-input" placeholder="Theme Clothes" onChange={this.onThemeChange} value={this.state.themeClothes} />
          <input type="text" className="text-input" placeholder="Location Name" value={this.state.locationName} disabled />
          <input type="text"
            className="text-input"
            placeholder="Address"
            onChange={this.onAddressChange}
            value={this.state.address}
            id="pac-input"
            value={this.state.address} />

          <div>
            <div>
              {/* <input className="controls" type="text" id="pac-input" placeholder="Enter Your Location" /> */}
            </div>
            <button className="button-add">
              Save Event
            </button>
          </div>
        </form>
        <Map event={this.props.event}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  map: state.map
});


export default connect(mapStateToProps)(EventForm);
