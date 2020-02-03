import React, { useState } from 'react';

// retrieve stored user if available
const storedUser = JSON.parse(localStorage.getItem('user'));


// create a 'globabl' context object
export const AuthContext = React.createContext();

// export Auth provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storedUser);

  return (
    <AuthContext.Provider value={{user, setUser}}	>
	  <AuthContext.Consumer>
	    {value => children}
	  </AuthContext.Consumer>
	</AuthContext.Provider>
  )
};

