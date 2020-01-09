const axios = require("axios");
const moment = require("moment");
export const getUserFromLocalStorage = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};

export const getEventsForUser = (user_id, onSuccess, onError) => {
  axios
    .get("http://localhost:4000/events", {
      params: {
        user_id: user_id
      }
    })
    .then(result => {
      onSuccess(result.data);
    })
    .catch(err => {
      console.error(err);
      onError(err);
    });
};
export const performDeleteEventRequest = (event_id, onSuccess, onError) => {
  axios
    .post("http://localhost:4000/delete-event", {
      event_id: event_id
    })
    .then(result => {
      if (onSuccess) onSuccess(result);
    })
    .catch(err => {
      if (onError) onError(err);
    });
};
export const performEditEventRequest = (
  event_id,
  date,
  title,
  description,
  completed,
  onSuccess,
  onError
) => {
  axios
    .post("http://localhost:4000/update-event", {
      event_id: event_id,
      date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
      title: title,
      description: description,
      completed: completed
    })
    .then(result => {
      if (onSuccess) onSuccess(result);
    })
    .catch(err => {
      if (onError) onError(err);
    });
};
export const performAddEventRequest = (
  user_id,
  date,
  title,
  description,
  completed,
  onSuccess,
  onError
) => {
  axios
    .post("http://localhost:4000/events", {
      user_id: user_id,
      date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
      title: title,
      description: description,
      completed: completed
    })
    .then(result => {
      if (onSuccess) onSuccess(result);
    })
    .catch(err => {
      if (onError) onError(err);
    });
};

export const filterEventsByDate = (date, eventsList) => {
  date = moment(date);
  let newEventsList = [];
  eventsList.forEach(event => {
    if (moment(event.date).isSame(date, "day")) {
      newEventsList.push(event);
    }
  });
  return newEventsList;
};
