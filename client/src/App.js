import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Calendar from './components/Calendar';
// import { Calendar, dateFnsLocalizer } from " react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import React, { useState } from "react";
// import DatePicker from "react-datepicker";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom"

// const locales = {
//   "pt-PT": require("date-fns/locale/pt")
// }

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales
// })

// const events = [
//   {
//     title: "Big Meeting",
//     allDay: true,
//     start: new Date(2021, 6, 0),
//     end: new Date(2021, 6, 0)
//   },
//   {
//     title: "Vacation",
//     start: new Date(2021, 6, 0),
//     end: new Date(2021, 6, 0)
//   },
//   {
//     title: "Conference",
//     start: new Date(2021, 6, 0),
//     end: new Date(2021, 6, 0)
//   }
// ]

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/calendar' element={<Calendar />} />
      </Routes>
    </>
  );
}

export default App;