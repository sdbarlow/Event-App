
import React from 'react'
import { useRouter } from 'next/router';
import EventList from '@/components/events/EventList';
import EventSearch from '@/components/events/EventSearch';
import { Fragment } from 'react';
import Head from 'next/head';

function AllEventsPage({ events }) {
    const router = useRouter();

    function findEventsHandler(year, month, day){
        const fullPath = `/events/${year}/${month}/${day}`

        router.push(fullPath)
    }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name='description' content='browse all of ur events'/>
      </Head>
        <EventSearch onSearch={findEventsHandler}></EventSearch>
        <EventList items={events}></EventList>
    </Fragment>
  )
}

export async function getStaticProps(){
  return fetch('https://nextjs-course-6cc40-default-rtdb.firebaseio.com/events.json')
        .then(res => res.json())
        .then((data) => {
            const transformedSales = []

            for (const key in data){
                transformedSales.push({id: key, date: data[key].date, description: data[key].description, image: data[key].image, isFeatured: data[key].isFeatured, location: data[key].location, title: data[key].title})
            }

            return { props: {events: transformedSales}, revalidate: 60 };
        })
}

export default AllEventsPage