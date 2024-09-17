import { NavLink } from "react-router-dom";
import cls from "./EventsNavigation.module.css";

function EventsNavigation() {
  return (
    <header className={cls.header}>
      <nav>
        <ul className={cls.list}>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) => (isActive ? cls.active : undefined)}
              end
            >
              All Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events/new"
              className={({ isActive }) => (isActive ? cls.active : undefined)}
            >
              New Event
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
