import axios from 'axios';

// use Axios to set auth token in default req headers
const setAuthToken = token => {
  if (token) {
	// if passed in a valid token, apply said token in default headers
	axios.defaults.headers.common['Authorization'] = token;
  } else {
	// if called without a valid token, remove existing token from headers
	delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;
