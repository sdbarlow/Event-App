import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import { getEventById } from '@/dummy-data';
import { Fragment } from 'react';
import EventSummary from '@/components/event-detail/event-summary';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventContent from '@/components/event-detail/event-content';
import Head from 'next/head';

function EventDetailPage({ events }) {

    console.log('events:', events)

    if(!events){
        return (
            <p>Loading...</p>
        )
    }

  return (
    <Fragment>
        <Head>
            <title>{events.title}</title>
            <meta name='description' content={events.description}/>
        </Head>
            <EventSummary title={events.title}></EventSummary>
            <EventLogistics date={events.date} address={events.location} image={events.image} imageAlt={events.title}></EventLogistics>
            <EventContent>
                <p>{events.description}</p>
            </EventContent>
    </Fragment>
  )
}

export async function getStaticPaths(){

    return fetch('https://nextjs-course-6cc40-default-rtdb.firebaseio.com/events.json')
        .then(res => res.json())
        .then((data) => {
            const transformedSales = []

            for (const key in data){
                transformedSales.push({id: key, date: data[key].date, description: data[key].description, image: data[key].image, isFeatured: data[key].isFeatured, location: data[key].location, title: data[key].title})
            }

            const paths = transformedSales.map((event) => ({params: {eventid: event.id}}));
            
            return {
                paths: paths,
                 fallback: true
                }
            
            
        })


}

export async function getStaticProps(context){
    const { params } = context

    return fetch(`https://nextjs-course-6cc40-default-rtdb.firebaseio.com/events/${params.eventid}.json`)
        .then(res => res.json())
        .then((data) => {


            return { props: {events: data}, revalidate: 30 };
        })

}

export default EventDetailPage