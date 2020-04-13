import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const Details = () => {

  const classPic = 'https://res.cloudinary.com/cloudforest/image/upload/v1586664925/MachineTime/tj-cnc-class.jpg';
  const shark = 'https://res.cloudinary.com/cloudforest/image/upload/v1586665447/MachineTime/SharkCNC.jpg';

  return (
    <section id='details'>

	  <h2 className='details-title'>Details about MachineTime</h2>

	  <figure className='detail-item'>
	    <div className='image-frame'>
		  <img src={classPic} alt='detail-1'/>
		</div>
		<ScrollAnimation animateIn='fadeInRight'>
		  <figcaption className='detail-description'>
		    <h3>Detail 1</h3>
			<ul className='detail-list'>
			  <li> Bullet 1 </li>
			  <li> Bullet 2 </li>
			  <li> Bullet 3 </li>
			</ul>
		  </figcaption>
		</ScrollAnimation>
	  </figure>

	  <figure className='detail-item'>
		<ScrollAnimation animateIn='fadeInLeft'>
		  <figcaption className='detail-description'>
		    <h3>Detail 1</h3>
			<ul className='detail-list'>
			  <li> Bullet 1 </li>
			  <li> Bullet 2 </li>
			  <li> Bullet 3 </li>
			</ul>
		  </figcaption>
		</ScrollAnimation>
	    <div className='image-frame'>
		  <img src={shark} alt='detail-1'/>
		</div>
	  </figure>

	  <figure className='detail-item'>
	    <div className='image-frame'>
		  <img src={classPic} alt='detail-1'/>
		</div>
		<ScrollAnimation animateIn='fadeInRight'>
		  <figcaption className='detail-description'>
		    <h3>Detail 1</h3>
			<ul className='detail-list'>
			  <li> Bullet 1 </li>
			  <li> Bullet 2 </li>
			  <li> Bullet 3 </li>
			</ul>
		  </figcaption>
		</ScrollAnimation>
	  </figure>

	</section>
  );
};

export default Details;

