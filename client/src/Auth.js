import React, { useState } from 'react';

// create a 'globabl' context object
export const AuthContext = React.createContext();

// export Auth provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{user, setUser}}	>
	  <AuthContext.Consumer>
	    {value => children}
	  </AuthContext.Consumer>
	</AuthContext.Provider>
  )
};

