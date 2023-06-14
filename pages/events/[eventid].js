import React from 'react'
import { useRouter } from 'next/router'
import { getEventById } from '@/dummy-data';
import { Fragment } from 'react';
import EventSummary from '@/components/event-detail/event-summary';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventContent from '@/components/event-detail/event-content';

function EventDetailPage() {
    const router = useRouter();

    console.log(router.query)
    const eventId = router.query.eventid
    const event = getEventById(eventId);

    if (!event){
        return(
            <p>No event found</p>
        )
    }

  return (
    <Fragment>
        <EventSummary title={event.title}></EventSummary>
        <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}></EventLogistics>
        <EventContent>
            <p>{event.description}</p>
        </EventContent>
    </Fragment>
  )
}

export default EventDetailPage