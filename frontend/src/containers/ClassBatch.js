import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useParams, Link } from 'react-router-dom';
import withAPI from '../services/api';
import Form from 'react-bootstrap/Form';
import '../App.css';
import Loading from '../common/Loading';

const ClassBatch = ({ api }) => {
  const params = useParams();
  //get this from the API instead of hardcoding it here (and in LearnerList.js)
  const modelFields = [
    'id', 'name', 'instructor'
  ]

  const [classbatchResult, setClassBatchResult] = useState("");

  //put this in a separate file and import it here  (and in LearnerList.js) to avoid duplication
  const fetchInfo = () => {
    api
      .fetchClassBatch(params.classbatchId)
      .then((res) => {
        console.log("Received ClassBatch:", res);
        setClassBatchResult(res);
      })
      .catch((e) => {
        console.log("Error fetching ClassBatch: ", e);
        setClassBatchResult('No results found...');
      });
  };

  //put this in a separate file and import it here  (and in LearnerList.js) to avoid duplication
  const updateClassBatchName = (text) => {
    api
      .updateClassBatch(params.classbatchId, { name: text })
      .then((res) => {
        console.log("Updated ClassBatch:", res);
        setClassBatchResult(res);
      })
      .catch((e) => {
        console.log("Error updating ClassBatch: ", e);
      });
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <h1>
        ClassBatch info:
      </h1>
      {!classbatchResult && (
        <Loading />
      )}
      <div className="content-container">
        {classbatchResult && classbatchResult.id && (
          modelFields.map((field) => {
            if (field === 'name') {
              return <div className='search-container'>
                <strong>{field + ": "}</strong>
                <Form.Control
                  key={classbatchResult.id + "_" + classbatchResult.name}
                  type="text"
                  placeholder='Enter name'
                  onBlur={(e) => updateClassBatchName(e.target.value)}
                  className='search-input'
                  defaultValue={classbatchResult.name}
                />
              </div>
            }
            else {
              return <div className='content-container' key={classbatchResult.id + "_" + classbatchResult[field]}>
                <strong>
                  {field + ": "}
                </strong>
                <span>{classbatchResult[field]}</span>
              </div>
            }
          })
        )}
        {classbatchResult && !classbatchResult.id && (
          <strong>
            No ClassBatch found with this id...
          </strong>
        )}
      </div>
      {classbatchResult && classbatchResult.learners && (
        <div>
          <strong>Learners:</strong>
          {classbatchResult.learners.map((learner) => (
            <div>
              <Link key={`${learner.id}_${learner.first_name}_${learner.last_name}`} to={'/learner/' + learner.id}>
                {learner.first_name + " " + learner.last_name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default compose(
  withAPI
)(ClassBatch);
