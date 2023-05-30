import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import withAPI from '../services/api';

import '../App.css';
import Loading from '../common/Loading';


const Learner = ({ api }) => {

  const params = useParams();
  //get this from the API instead of hardcoding it here (and in LearnerList.js)
  const modelFields = [
    'id', 'first_name', 'last_name', 'grade'
  ]

  const [learnerResult, setLearnerResult] = useState(null);

  //put this in a separate file and import it here  (and in LearnerList.js) to avoid duplication
  const fetchInfo = () => {
    setLearnerResult(null);
    api
      .fetchLearner(params.learnerId)
      .then((res) => {
        console.log("Received Learner:", res);
        setLearnerResult(res);
      })
      .catch((e) => {
        console.log("Error fetching Learner: ", e);
        setLearnerResult('No results found...');
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <h1>
        Learner info:
      </h1>
      {!learnerResult && (
        <Loading />
      )}
      <div>
        {learnerResult && learnerResult.id && (
          modelFields.map((field) => (
            <div className='content-container'>
              <strong>
                {field + ": "}
              </strong>
              <span>{learnerResult[field]}</span>
            </div>
          ))
        )}
        {learnerResult && !learnerResult.id && (
          <strong>
            No Learner found with this id...
          </strong>
        )}
      </div>
    </div>
  );
}

export default compose(
  withAPI
)(Learner);
