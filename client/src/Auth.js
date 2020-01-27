import React, { useState } from 'react';

// create a 'globabl' context object
export const AuthContext = React.createContext();

// export Auth provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{token, setToken}}	>
	  <AuthContext.Consumer>
	    {value => children}
	  </AuthContext.Consumer>
	</AuthContext.Provider>
  )
};

