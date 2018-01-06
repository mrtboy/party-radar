import moment from 'moment';
import map from '../components/Map';

//Get visible Events
const getVisibleEvents = (events, { text, sortBy, startDate, endDate, range, currentLocation }) => {
  return events.filter((event)=>{
    const eventDateMoment = moment(event.eventDate);
    const startDateMatch = startDate ? startDate.isSameOrBefore(eventDateMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(eventDateMoment, 'day') : true;
    const textMatch = event.title.toLowerCase().includes(text.toLowerCase());
    const rangeMatch = range ? nearMe(range, currentLocation, event.geolocation) : true;

    return startDateMatch && endDateMatch && textMatch && rangeMatch;
  }).sort((a, b)=>{
    if (sortBy === 'date') {
      return a.eventDate < b.eventDate ? 1 : -1;
    }
  });

};

export default getVisibleEvents;


function nearMe(range, currenctLocation, eventLocation){
  if( findDistance(currenctLocation, eventLocation) < range * 1000 ){
    console.log(true);
    return true;
  } else {
    console.log(false);
    return false;
  }

  // console.log(range + ' ' + currenctLocation+' ' + eventLocation ); 
}

function findDistance(first, second) {

  var R = 6371e3; // metres
  var t1 = toRadian(first.lat);
  var t2 = toRadian(second.lat);
  var dt = toRadian(second.lat - first.lat);
  var dl = toRadian(second.lng - first.lng);

  var a = Math.sin(dt / 2) * Math.sin(dt / 2) +
    Math.cos(t1) * Math.cos(t1) *
    Math.sin(dl / 2) * Math.sin(dl / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;
  // console.log(d / 1000);
  console.log(d, R, c);
  return d;
}
function toRadian(angle) {
  return angle * (Math.PI / 180);
  // console.log(angle * (Math.PI / 180));
}

