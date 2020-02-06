import React from 'react';
import Popup from 'reactjs-popup';

const Modal = props => (
  <Popup open={props.open} closeOnDocumentClick onClose={props.closeModal}>
    <div className='modal'>
	  <a className='close' onClick={props.closeModal}>
	    &times;
	  </a>
	  <div className='modal-header'>
	    {props.title}
	  </div>
	  <div className='modal-content'>
		<span className='modal-machine'>Machine: {props.title}</span>
		<span className='modal-start'>Start: {props.start}</span>
		<span className='modal-end'>End: {props.end}</span>
	  </div>
	</div>
  </Popup>
);

export default Modal;
