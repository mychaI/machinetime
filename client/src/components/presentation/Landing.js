import React, { useEffect } from 'react';
import Hero from './Hero';
import Details from './Details';

const Landing = () => {

  return (
	<>
	  <div id='landing-page'>
	    <div className='landing-bg'>
		</div>

		<Hero />

		<Details />

		<section id='about'>
		  <h2> About the Workshop </h2>
		  <div className='about-item'>
		    <p>Shop Hours </p>
			<p>Contact </p>
		  </div>
		</section>
	  </div>

	</>
  )
}

export default Landing;
