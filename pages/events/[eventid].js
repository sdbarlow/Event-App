import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import { getEventById } from '@/dummy-data';
import { Fragment } from 'react';
import EventSummary from '@/components/event-detail/event-summary';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventContent from '@/components/event-detail/event-content';

function EventDetailPage({ events }) {
    let title 
    let date 
    let image 
    let description
    let location 

    useEffect(() => {
        if(events){
            events.map((event) => {
                title = event.title;
                date = event.date;
                image = event.image;
                description = event.description;
                location = event.location;
            })
        }
    }, [events])

  return (
    <Fragment>
            <EventSummary title={title}></EventSummary>
            <EventLogistics date={date} address={location} image={image} imageAlt={title}></EventLogistics>
            <EventContent>
                <p>{description}</p>
            </EventContent>
    </Fragment>
  )
}

export async function getStaticPaths(){
    const paths = [
        {params: { eventid: 'e1' }},
        {params: { eventid: 'e2' }},
        {params: { eventid: 'e3' }},
    ];

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps(context){
    const { params } = context

    return fetch('https://nextjs-course-6cc40-default-rtdb.firebaseio.com/events.json')
        .then(res => res.json())
        .then((data) => {
            const transformedSales = []

            for (const key in data){
                if(key === params.eventid)
                transformedSales.push({id: key, date: data[key].date, description: data[key].description, image: data[key].image, isFeatured: data[key].isFeatured, location: data[key].location, title: data[key].title})
            }

            console.log('transformed:', transformedSales)

            return { props: {events: transformedSales}, revalidate: 10 };
        })

}

export default EventDetailPage