import React from 'react'
import { useRouter } from 'next/router'
import { getFilteredEvents } from '@/dummy-data';
import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/results-title';
import { Fragment } from 'react';
import Button from '../../components/ui/button'

function FilteredEventsPage() {
    const router = useRouter();

    const filterData = router.query.slug

    if (!filterData){
        return <p className='center'>Loading...</p>
    }

    const filteredYear = filterData[0]
    const filteredMonth = filterData[1]

    //Transform Strings into Integers
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;


    if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12){
        return <Fragment>
            <p>Invalid Values Bish</p>
            <div className='center'>
            <Button link='/events'>Show All Events</Button>
            </div>
        </Fragment>
    }


    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    if (filteredEvents.length === 0 || !filteredEvents){
        return <h1>No Events Found For Chosen Filter</h1>
    }

    const date = new Date(numYear, numMonth - 1);

  return (
   <Fragment>
       <ResultsTitle date={date}></ResultsTitle>
      <EventList items={filteredEvents}/>
   </Fragment>
  )
}

export default FilteredEventsPage
