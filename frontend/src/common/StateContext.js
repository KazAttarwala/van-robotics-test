import React, { createContext, useState, useEffect } from 'react';
import { compose } from 'redux';
//import withAPI from '../services/api';

// Create the context
export const StateContext = createContext();

// Create the provider
export const StateProvider = ({ children, api }) => {
  const [totalLearners, setTotalLearners] = useState(null);

  const fetchTotalLearners = () => {
    api
      .fetchLearnerList()
      .then((res) => {
        console.log("Received Learners:", res);
        setTotalLearners(res);
      })
      .catch((e) => {
        console.log("Error fetching Learners: ", e);
        setTotalLearners(null);
      });
  };

  useEffect(() => {
    fetchTotalLearners();
  }, []);

  return (
    <StateContext.Provider value={{ totalLearners, setTotalLearners }}>
      {children}
    </StateContext.Provider>
  );
};

// export default compose(
//   withAPI
// )(StateProvider);
export default StateProvider;
