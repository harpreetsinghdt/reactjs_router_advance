import React from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

const EditEvent = () => {
  const data = useRouteLoaderData("event-detail");

  return <EventForm method="patch" event={data.event} />;
};

export default EditEvent;
