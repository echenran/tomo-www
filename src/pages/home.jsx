import * as React from "react";
import { animated } from "react-spring";
import { Link } from "wouter";

// Our language strings for the header
const salutations = [
  "nice to meet you",
  "mucho gusto",
  "はじめまして",
  "enchanté",
  "很高兴认识你",
  "נעים מאוד",
  "만나서 반가워",
  "angenehm",
  "очень приятно"
];

/**
* The Home function defines the content that makes up the main content of the Home page
*
* This component is attached to the /about path in router.jsx
* The function in app.jsx defines the page wrapper that this appears in along with the footer
*/

export default function Home() {
  /* We use state to set the hello string from the array https://reactjs.org/docs/hooks-state.html
     - We'll call setHello when the user clicks to change the string
  */
  const [salutation, setCurrentSalutation] = React.useState(salutations[0]);
  const [index, setIndex] = React.useState(0);
  const [fade, setFade] = React.useState(true);  // Manage fade-in and fade-out

  React.useEffect(() => {
        const intervalId = setInterval(() => {
            setFade(false);  // Start with fade-out

            setTimeout(() => {
                setIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % salutations.length;
                    setCurrentSalutation(salutations[nextIndex]);
                    return nextIndex;
                });
                setFade(true);  // Then fade-in with new salutation
            }, 700);  // Half the interval time to switch text in the middle of the interval

        }, 5000); // Change the salutation every 3 seconds

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, [salutations]);

  
  return (
    <div className="landing-page">
      <img className="icon" src="https://cdn.glitch.global/2b763855-0676-4a78-81bd-d4a7270796fd/Screenshot_2024-05-01_at_8.59.19_PM-removebg-preview.png?v=1714622410874"></img>
      <h1 className="title">hello, i’m tomo. <br /> <span className={`salutation ${fade ? 'fade-in' : 'fade-out'}`}> {salutation} </span></h1>
      <div className="tagline">
        an ai-powered language speaking partner tailored to your proficiency
      </div>
      <a href="https://forms.gle/sFsNqh78DDSjKeX99"><button className="button"> join the waitlist </button></a>
      <div className="footer">made with ♥ by <a href="https://www.linkedin.com/in/emirakdere/">Emir Akdere</a> and <a href="http://www.eddiejiao.com/">Eddie Jiao</a></div>
    </div>
  );
}
