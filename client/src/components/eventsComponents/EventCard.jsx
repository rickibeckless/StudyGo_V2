import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageTitle from "../PageTitle.jsx";
import LoadingScreen from "../LoadingScreen.jsx";

export default function EventCard({ event, cardKey, currentEvent }) {
    const eventDateTime = new Date(event.event_date_time);

    const eventDateFull = eventDateTime.toDateString()
    const eventDate = eventDateTime.toLocaleDateString();
    const eventTime = eventDateTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });

    const eventDuration = event.event_duration.hours;
    const eventEndDateTime = new Date(eventDateTime.getTime() + eventDuration * 60 * 60 * 1000);

    const eventEndTime = eventEndDateTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });

    const timeUntilEvent = new Date(event.event_date_time).getTime() - new Date().getTime();

    const timeUntilEventDays = Math.floor(timeUntilEvent / (1000 * 60 * 60 * 24));
    const leftoverMilliseconds = timeUntilEvent % (1000 * 60 * 60 * 24);
    const leftoverHours = Math.floor(leftoverMilliseconds / (1000 * 60 * 60));
    const leftoverMinutes = Math.floor((leftoverMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    const formattedDays = String(timeUntilEventDays).padStart(2, '0');
    const formattedHours = String(leftoverHours).padStart(2, '0');

    return (
        <li key={cardKey} className={`${currentEvent ? `current-event-item` : `event-item`}`}>
            <div className="event-container">
                <div className="event-info-holder">
                    <h3 className="event-info-title">{event.event_name}</h3>
                    <p className="event-info-description">{event.event_description}</p>
                    {!currentEvent ?
                        <div className="event-info-date-time-holder">
                            <p className="event-info-time">{eventTime} — {eventEndTime}</p>
                            <p className="event-info-date" title={eventDateFull}>{eventDate}</p>
                            <h4 className="event-info-time-title">Time Until Event:</h4>
                            <p className="event-info-remaining">{formattedDays} days, {formattedHours} hours, {leftoverMinutes} minutes</p>
                        </div>
                    : null
                    }
                </div>
            </div>
        </li>
    );
};