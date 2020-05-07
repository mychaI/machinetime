import React, { useEffect } from 'react';
import Hero from './Hero';
import Details from './Details';
import Services from './Services';
import Footer from './Footer';

const Landing = () => {

  return (
	<>
	  <div id='landing-page'>
	    <div className='landing-bg'>
		</div>

		<Hero />

		<Details />

		<Services />

		<Footer />

	  </div>

	</>
  )
}

export default Landing;
