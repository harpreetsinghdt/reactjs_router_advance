import React, { Suspense } from "react";
import {
  Await,
  defer,
  json,
  Link,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem.js";
import EventsList from "../components/EventsList.js";

const EventDetail = () => {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
      <p>
        <button>
          <Link to=".." relative="path">
            Back
          </Link>
        </button>
      </p>
    </>
  );
};

export default EventDetail;

const loadEvent = async (id) => {
  // return fetch("http://localhost:8080/events/"+id);

  const res = await fetch("http://localhost:8080/events/" + id);

  if (!res.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    const resData = await res.json();
    return resData.event;
  }
};

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

export const loader = async ({ params }) => {
  const id = params.id;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
};

export const action = async ({ request, params }) => {
  const id = params.id;
  const res = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });
  if (!res.ok) {
    throw json({ message: "Could not delete event!" }, { status: 500 });
  }

  return redirect("/events");
};
