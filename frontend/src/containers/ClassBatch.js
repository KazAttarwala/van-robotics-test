import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useParams, Link } from 'react-router-dom';
import withAPI from '../services/api';

import logo from '../static/logo.svg';
import '../App.css';


const ClassBatch = ({ api }) => {

  const params = useParams();
  //get this from the API instead of hardcoding it here (and in LearnerList.js)
  const modelFields = [
    'id', 'name', 'instructor'
  ]

  const [classbatchResult, setClassBatchResult] = useState(null);

  //put this in a separate file and import it here  (and in LearnerList.js) to avoid duplication
  const fetchInfo = () => {
    setClassBatchResult(null);
    api
      .fetchClassBatch(params.classbatchId)
      .then((res) => {
        console.log("Received ClassBatch:",res);
        setClassBatchResult(res);
      })
      .catch((e) => {
        console.log("Error fetching ClassBatch: ",e);
        setClassBatchResult('No results found...');
      });
  };
  
  //put this in a separate file and import it here  (and in LearnerList.js) to avoid duplication
  const updateClassBatchName = (text) => {
    api
      .updateClassBatch(params.classbatchId, {name: text})
      .then((res) => {
        console.log("Updated ClassBatch:",res);
        fetchInfo();
      })
      .catch((e) => {
        console.log("Error updating ClassBatch: ",e);
      });
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <div>
        <p>
          ClassBatch info:
        </p>
      </div>
      <div>
        {classbatchResult && classbatchResult.id && (
          modelFields.map((field) => {
            if (field === 'name') {
              return <div>
                {field + ": "}
                <input
                  type="text"
                  onChange={(e) => updateClassBatchName(e.target.value)}
                  value={classbatchResult[field]}
                />
              </div>
            }
            else {
              return <div>
                {field + ": " + classbatchResult[field]}
              </div>
            }
    })
        )}
        {classbatchResult && !classbatchResult.id && (
          <p>
            No ClassBatch found with this id...
          </p>
        )}
      </div>
      <div>
        <div>
          <p>Learners</p>
        </div>
        <div>
          {classbatchResult && classbatchResult.learners && (
            classbatchResult.learners.map((learner) => (
              <Link to={'/learner/' + learner.id}>
                {learner.first_name + " " + learner.last_name}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default compose(
  withAPI
)(ClassBatch);
