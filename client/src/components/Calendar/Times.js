import React from 'react'
import {useState} from 'react';

const time = ['8:00 AM','9:00 AM','10:00 AM','2:00 PM','3:00 PM']

function Times(props) {

    const [event, setEvent] = useState(null)
    const [info, setInfo] = useState(false)

    function displayInfo(e) {
        setInfo(true);
        setEvent(e.target.innerText);
    }

return (
 
 <div className="times text-center">
   {time.map(times => {
    return (
    <div>
      <button className='rounded-md border-solid border-[1px] px-2 m-2 border-black' onClick={(e)=> displayInfo(e)}> {times} </button>
    </div>
        )
     })}
    <div>
      {info ? <div>You have selected <span className='font-bold'>{event}</span> on <span className='font-bold'>{props.date.toDateString()}</span></div> : null}
    </div>
 </div>
  )
}

export default Times;