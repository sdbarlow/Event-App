import React from 'react'
import Head from 'next/head';
import EventList from '../components/events/EventList';

function HomePage({ featuredEvents }) {

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events that allow you to evolve...'/>
      </Head>
        <EventList items={featuredEvents}/>
    </div>
  )
}

export async function getStaticProps(){
  return fetch('https://nextjs-course-6cc40-default-rtdb.firebaseio.com/events.json')
        .then(res => res.json())
        .then((data) => {
            const transformedSales = []

            for (const key in data){
              if(data[key].isFeatured === true){
                transformedSales.push({id: key, date: data[key].date, description: data[key].description, image: data[key].image, isFeatured: data[key].isFeatured, location: data[key].location, title: data[key].title})
              }
            }

            return { props: {featuredEvents: transformedSales}, revalidate: 1800 };
        })
}


export default HomePage