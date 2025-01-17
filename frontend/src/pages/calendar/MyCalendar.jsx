import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

// const state = {
//   events: [
//     {
//       start: moment().toDate(),
//       end: moment().add(1, "days").toDate(),
//       title: "Some title",
//     },
//   ],
// };

// const onEventResize = (data) => {
//   const { start, end } = data;

//   setState((state) => {
//     state.events[0].start = start;
//     state.events[0].end = end;
//     return { events: [...state.events] };
//   });
// };

// const onEventDrop = (data) => {
//   console.log(data);
// };

export default function MyCalendar(props) {
  const [state, setState] = useState({
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Some title",
      },
    ],
  });
  const onEventResize = (data) => {
    const { start, end } = data;

    setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  const onEventDrop = (data) => {
    console.log(data);
  };
  return (
    <div className="App">
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={state.events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: "100vh" }}
      />
    </div>
  );
}
