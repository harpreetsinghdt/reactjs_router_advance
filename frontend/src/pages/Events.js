import { Await, defer, json, useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  // case 1
  // const events = useLoaderData();
  // case 2
  const data = useLoaderData();
  const events = data.events;
  // case 3
  // const data = useLoaderData();
  // const events = data.events;

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  // return <EventsList events={events} />;

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events!" };
    // throw { message: "Could not fetch events!" };
    // throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
    //   status: 500,
    // });
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    // case 1
    const resData = await response.json();
    return resData.events;

    // case 2
    // const resData = new Response(response, {status: 201});
    // return resData;

    // case 3
    // return response;
  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
