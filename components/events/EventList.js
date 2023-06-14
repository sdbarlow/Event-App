import React from 'react'
import EventItem from './EventItem'
import classes from './EventList.module.css'

function EventList(props) {
    const {items} = props

  return (
    <ul className={classes.list}>
        {items.map((item) => { return(
            <>
            <EventItem key={item.id} id={item.id} title={item.title} date={item.date} location={item.location} image={item.image}/>
            </>
        )
        })}
    </ul>
  )
}

export default EventList