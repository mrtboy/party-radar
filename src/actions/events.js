import uuid from 'uuid';
import database from '../firebase/firebase';
import moment from 'moment';
//Add
export const addEvent = ({ event } = {}
) => ({
  type: 'ADD_EVENT',
  event
});

export const addEventTodb = (eventData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      type = '',
      eventDate = 0,
      startTime = 0,
      endTime = 0,
      description = '',
      themeClothes = '',
      place_id = '',
      address = '',
      locationName = '',
      geolocation = {}
    } = eventData;
    const event = {
      title,
      type,
      eventDate,
      startTime,
      endTime,
      description,
      themeClothes,
      place_id,
      address,
      locationName,
      geolocation,
      uid
    };
    return database.ref(`events`).push(event)
      .then((ref) => {
        dispatch(addEvent({
          id: ref.key,
          ...event
        }));
      });
  };
};

export const removeEvent = ({ id } = {}) => ({
  type: 'REMOVE_EVENT',
  id
});

export const removeEventFromdb = (({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database.ref(`events/${id}`).once('value')
      .then((snapshot) => {
        let owner = snapshot.child('uid').val();
        if (uid === owner) {
          return database.ref(`events/${id}`).remove().then(() => {
            dispatch(removeEvent({ id }));
          });
        } else {
          return
        }
      });
  }
});


export const editEvent = (id, updates) => ({
  type: 'EDIT_EVENT',
  id,
  updates
});

export const editEventFromdb = (id, update) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database.ref(`events/${id}`).once('value')
      .then((snapshot) => {
        let owner = snapshot.child('uid').val();
        if (uid === owner) {
          return database.ref(`events/${id}`).update(update).then(() => {
            dispatch(editEvent(id, update));
          });
        }
      });
  };
};

export const setEvents = (events = {}) => ({
  type: 'SET_EVENTS',
  events
});

let uid ="";
export const setEventsFromdb = () => {
  return (dispatch, getState) => {
    uid = getState().auth.uid;
    return database.ref(`events`).once('value').then((snapshot) => {
      const events = [];

      snapshot.forEach((childSnapshot) => {
        events.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setEvents(events));
    });
  }
};

export const owner = (id) => {
  return (id===uid ? true : false);
}

export const setMyEventsFromdb = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`events`).once('value').then((snapshot) => {
      const events = [];
      snapshot.forEach((childSnapshot) => {
      
        if (childSnapshot.val().uid === uid) {
          events.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        }
        else {
          return
        }
      });
      dispatch(setEvents(events));
    });
  }
};
