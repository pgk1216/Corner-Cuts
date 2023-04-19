import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Import Components */
import TitleBar from "./components/TitleBar";
import Home from "./components/Home";
import Appointment from "./components/Appointment";
import Booked from "./components/Booked";

import Admin from "./components/Admin/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/appointments",
    element: <Appointment />,
  },
  {
    path: "/success",
    element: <Booked />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

function App() {
  return (
    <main>
      <TitleBar />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;

/*

Front-end Plan:

Front Page
- Corner Cuts logo on top
- Quick summary of the website
- Button that says 'Book an appointment now'
- Footer should have socials (instagram, facebook)

Appointment Page
- Once button is clicked, href to calendar page ('/appointment')
- Page has calendar and below it has time options for that date
- Can only pick one date, so if the user picks another date, it will deselect current and select the clicked one
- Show area for name and email

Confirmation Page
- Shows "Thank you, confirmation has been sent to the email specified"
- Button to go back to the front page

Administration Page
- Login is only for administrators found at /admin
- Shows what appointments have been made

*/

/*

Back-end Plan:
NOTE: Use Javascript for administrator, Database for appointment

- Appointment Schema: {name, email, Date (should also contain Time)}

Two database clusters:
- One for available times
- One for booked times

Appointment Page
- For now, the available times would be managed by me
  - 9am-12pm on Friday and Saturday
- Once appointment is made, send email to both customer and admin
- Take off time for available times, add to booked

Administration Page
- Admin should see what appointments have been made
- Admins should be able to cancel appointments
  - Cancelling would add the time back to available times and delete that entry from booked times

*/
