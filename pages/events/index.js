
import React from 'react'
import { useRouter } from 'next/router';
import EventList from '@/components/events/EventList';
import EventSearch from '@/components/events/EventSearch';
import { Fragment } from 'react';

function AllEventsPage({ events }) {
    const router = useRouter();

    function findEventsHandler(year, month){
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath)
    }

  return (
    <Fragment>
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

            return { props: {events: transformedSales}, revalidate: 10 };
        })
}

export default AllEventsPage