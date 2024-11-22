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
            <a href="https://maps.app.goo.gl/QZ5ywB4rDxknyMkk9">See in Google Map</a>
            <div>
            <img src={dupA} className='dupA' alt="DUP A" />
            </div>
            <h3>
            Please Note:
            </h3>
            {/* <ul>
                <li>
                Kindly bring your NRIC (identification card), matric card, payment receipt and
                softcopy of email received after registration on the Kit Run Collection Day as a proof of registration.
                </li>
                <li>
                If you can't make it or would like to collect for your friend(s), kindly bring your friend(s)' payment proof and copy of NRIC (photo image/soft copy on hand phone will do).
                </li>
                <li>
                Please bring your own recycle bag for collection of group t-shirts. Go Green!
                </li>
                <li>
                There shall be no size exchange allowed on collection day. Organizers will try to fulfil the 
                T-shirts sizing indicated by your entry form as on first come first serve basis.
                </li>
                <li>
                Wearing the official event T-shirt is strongly encouraged. We are excited to see you soon!
                </li>
            </ul>             */}
            <p>
                1. Kindly bring your NRIC (identification card), matric card, payment receipt and
                softcopy of email received <br></br> after registration on the Kit Run Collection Day as a proof of registration.
            </p>
            <p>
                2. If you can't make it or would like to collect for your friend(s), kindly bring your friend(s)' payment proof and <br></br> copy of NRIC (photo image/soft copy on hand phone will do).
            </p>
            <p>
                3. Please bring your own recycle bag for collection of group t-shirts. Go Green!
            </p>
            <p>
                4. There shall be no size exchange allowed on collection day. Organizers will try to fulfil the <br></br>
                T-shirts sizing indicated by your entry form as on first come first serve basis.
            </p>
            <p>
                5. Wearing the official event T-shirt is strongly encouraged. We are excited to see you soon!
            </p>
            <table>
  <caption>Programme Tentatives</caption>
  <thead>
    <tr>
      <th>Time</th>
      <th>Activity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>7.30pm</td>
      <td>Registration: Participants arrive at the running venue</td>
    </tr>
    <tr>
      <td>7.45pm</td>
      <td>Opening Ceremony</td>
    </tr>
    <tr>
      <td>8.00pm</td>
      <td>Warm-Up Session</td>
    </tr>
    <tr>
      <td>8.15pm</td>
      <td>Neon Run Start</td>
    </tr>
    <tr>
      <td>9.45pm</td>
      <td>Finish Line</td>
    </tr>
    <tr>
      <td>9.50pm</td>
      <td>Lucky Draw 1</td>
    </tr>
    <tr>
      <td>10.00pm</td>
      <td>Performances</td>
    </tr>
    <tr>
      <td>11.00pm</td>
      <td>Closing Ceremony</td>
    </tr>
  </tbody>
</table>
        </div></>

    );

}

export default Info;