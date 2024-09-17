import React from "react";
import EventForm from "../components/EventForm";
// import { json, redirect } from "react-router-dom";

const NewEvent = () => {
  return <EventForm method="post" />;
};

export default NewEvent;

// form action to save data to backend
// export const action = async ({ request, param }) => {
//   const data = await request.formData();
//   const eventData = {
//     title: data.get("title"),
//     image: data.get("image"),
//     date: data.get("date"),
//     description: data.get("description"),
//   };
//   const res = await fetch("http://localhost:8080/events", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(eventData),
//   });
//   if (res.status === 422) {
//     return res;
//   }
//   if (!res.ok) {
//     throw json(
//       { message: "Could not save details for event." },
//       { status: 500 }
//     );
//   }

//   return redirect("/events");
// };
