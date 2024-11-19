import React from 'react';
import './Info.css'
import dupA from "../image/dupA.png"

function Info()
{

    return(
        <><div className='info-container'>
            <h1>
                Race Kit Collection
            </h1>
            <h2>
                Date: 3rd, 4th, and 5th June
                <br></br>
                Time: 6.00pm - 10.00pm
                <br></br>
                Venue: Dewan Utama Pelajar A
            </h2>
            <div>
            <img src={dupA} className='dupA' alt="DUP A" />
            </div>
            <p>
                Please Note:
                <br></br>
                <br></br>
                1. Kindly bring your NRIC (identification card), matric card, payment receipt and
                softcopy of email received after registration on the Kit Run Collection Day as a proof of registration.
            </p>
            <p>
                2. If you can't make it or would like to collect for your friend(s), kindly bring your friend(s)' payment proof and copy of NRIC (photo image/soft copy on hand phone will do).
            </p>
            <p>
                3. Please bring your own recycle bag for collection of group t-shirts. Go Green!
            </p>
            <p>
                4. There shall be no size exchange allowed on collection day. Organizers will try to fulfil the
                T-shirts sizing indicated by your entry form as on first come first serve basis.
            </p>
            <p>
                5. Wearing the official event T-shirt is strongly encouraged. We are excited to see you soon!
            </p>
        </div></>

    );

}

export default Info;
