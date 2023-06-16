import Image from 'next/image';
import React from 'react'
import classes from './EventItem.module.css'
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import Button from '../ui/button';

function EventItem(props) {
    const { title, image, date, location, id } = props;

    const humanReadableDate = new Date(date).toDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'string'
    })
    const formattedAddress = location.replace(', ', '\n')
    const exploreLink = `/events/${id}`
  return (
    <li className={classes.item}>
        <Image src={'/' + image} alt={title} width={250} height={160}/>
        <div className={classes.content}>
            <div className={classes.summary}><h2>{title}</h2>
            <div className={classes.date}><DateIcon/><time>{humanReadableDate}</time></div>
            <div className={classes.address}><AddressIcon/><address>{formattedAddress}</address></div>
            <div className={classes.actions}><Button link={exploreLink}><span>Explore Event</span><span className={classes.icon}><ArrowRightIcon></ArrowRightIcon></span></Button></div>
            </div>
        </div>
    </li>
  )
}

export default EventItem;