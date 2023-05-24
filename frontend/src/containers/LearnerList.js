import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useParams, Link } from 'react-router-dom';
import withAPI from '../services/api';

import logo from '../static/logo.svg';
import '../App.css';

const LearnerList = ({ api }) => {

  const params = useParams();
  const modelFields = [
    'id', 'first_name', 'last_name', 'grade', 'classbatch'
  ]

  const [learnerList, setLearnerList] = useState(null);

  //put this in a separate file and import it here  (and in LearnerList.js) to avoid duplication
  const fetchInfo = () => {
    setLearnerList(null);
    api
      .fetchLearnerList()
      .then((res) => {
        console.log("Received Learners:",res);
        setLearnerList(res);
      })
      .catch((e) => {
        console.log("Error fetching Learners: ",e);
        setLearnerList(null);
      });
  };

  //put this in a separate file and import it here  (and in LearnerList.js) to avoid duplication
  const deleteLearner = (lid) => {
    api
      .deleteLearner(lid)
      .then((res) => {
        console.log("Deleted Learner:",res);
        fetchInfo();
      })
      .catch((e) => {
        console.log("Error deleting Learner: ",e);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <div>
        <p>
          All Learners
        </p>
      </div>
      <div>
        {learnerList && learnerList.length > 0 ? (
          learnerList.map((learner) => (
            <div>
              <Link to={`/learner/${learner.id}`}>
                {learner.first_name + " " + learner.last_name}
              </Link>
              <button
                onClick={() => deleteLearner(learner.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : 
        (
          <p>
            No Learners found...
          </p>
        )}
      </div>
    </div>
  );
}

export default compose(
  withAPI
)(LearnerList);
