import React from 'react'
import { useRouter } from 'next/router'
import { getFilteredEvents } from '@/dummy-data';
import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/results-title';
import { Fragment } from 'react';
import Button from '../../components/ui/button'

function FilteredEventsPage({ filteredEvents, hasError, year, month }) {

    if (!filteredEvents){
        return <p className='center'>Loading...</p>
    }


    if(hasError){
        return <Fragment>
            <p>Invalid Values Bish</p>
            <div className='center'>
            <Button link='/events'>Show All Events</Button>
            </div>
        </Fragment>
    }

    if (filteredEvents.length === 0 || !filteredEvents){
        return <h1>No Events Found For Chosen Filter</h1>
    }

    const date = new Date(year, month - 1);

  return (
   <Fragment>
       <ResultsTitle date={date}></ResultsTitle>
      <EventList items={filteredEvents}/>
   </Fragment>
  )
}

export async function getServerSideProps(context){

    const { params } = context

    const filterData = params.slug

    const filteredYear = filterData[0]
    const filteredMonth = filterData[1]
    const filteredDay = filterData[2]

    //Transform Strings into Integers
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    const numDay = +filteredDay

    const filteredDate = `${numYear}-${0}${numMonth}-${numDay}`
    console.log('filteredDate:', filteredDate)


    if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12){
        return {
            props: {hasError: true}
        }
    }

    return fetch(`https://nextjs-course-6cc40-default-rtdb.firebaseio.com/events.json?orderBy="date"&equalTo="${filteredDate}"`)
        .then(res => res.json())
        .then((data) => {
            const transformedEvents = []

            for (const key in data){
                transformedEvents.push({id: key, date: data[key].date, description: data[key].description, image: data[key].image, isFeatured: data[key].isFeatured, location: data[key].location, title: data[key].title})
            }

            return {props: {filteredEvents: transformedEvents, hasError: false, year: numYear, month: numMonth}}

        })



}

export default FilteredEventsPage
