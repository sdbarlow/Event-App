import React from 'react'
import Button from '../ui/button'
import classes from './EventSearch.module.css'
import { useRef } from 'react';

function EventSearch(props) {

    const yearInput = useRef()
    const monthInput = useRef()
    const dayInput = useRef()

    function submitHandler(event){
        event.preventDefault();
        
        const selectedYear = yearInput.current.value
        const selectedMonth = monthInput.current.value
        const selectedDay = 

        props.onSearch(selectedYear, selectedMonth);
    }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
            <div className={classes.control}>
                <label htmlFor='year'>Year</label>
                <select id='year' ref={yearInput}>
                    <option value='2021'>2021</option>
                    <option value='2022'>2022</option>
                </select>
            </div>
            <div className={classes.control}>
                <label htmlFor='Month'>Month</label>
                <select id='Month' ref={monthInput}>
                    <option value='1'>January</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                </select>
            </div>
            <div className={classes.control}>
                <label htmlFor='Day'>Day</label>
                <select id='Day' ref={dayInput}>
                    <option value='1'>January</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                    <option value='13'>January</option>
                    <option value='14'>February</option>
                    <option value='15'>March</option>
                    <option value='16'>April</option>
                    <option value='17'>May</option>
                    <option value='18'>June</option>
                    <option value='19'>July</option>
                    <option value='20'>August</option>
                    <option value='21'>September</option>
                    <option value='22'>October</option>
                    <option value='23'>November</option>
                    <option value='24'>December</option>
                </select>
            </div>
        </div>
        <Button>Find Events</Button>
    </form>
  )
}

export default EventSearch