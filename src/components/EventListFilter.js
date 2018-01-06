import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, setStartDate, setEndDate, setRange } from '../actions/filters';
import Map from './Map';
import { getLocation } from './../actions/map';

class EventListFilters extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      calendarFocused: null,
      range: 0
    };

  }
  
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    }
  };

  handleRangeChange = (e) => {
    this.props.setRange(e.target.value, this.props.map.geolocation);
  }

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search Events"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            {/* <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
            </select> */}
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          <div className="input-group__item">
            <input className="text-input" type="text" placeholder="Km" onChange={this.handleRangeChange} value={this.props.filters.range} />
          </div>
          
        </div>
        <div className="hiddenMap"><Map /></div>
        
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  filters: state.filters,
  map: state.map
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  setRange: (range, currentLocation) => dispatch(setRange(range, currentLocation))
});
export default connect(mapStateToProps, mapDispatchToProps)(EventListFilters);

