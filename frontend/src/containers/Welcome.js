import React, { useContext, useEffect, useState } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import withAPI from '../services/api';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { StateContext } from '../common/StateContext';

const Welcome = ({ api }) => {
  const [learnerSearchText, setLearnerSearchText] = useState(null);
  const [learnerResult, setLearnerResult] = useState(null);
  const [classbatchSearchText, setClassBatchSearchText] = useState(null);
  const [classbatchResult, setClassBatchResult] = useState(null);
  const { totalLearners, setTotalLearners } = useContext(StateContext);

  //put this in a separate file and import it here  (and in LearnerList.js) to avoid duplication
  const learnerSearch = (text) => {
    setLearnerResult(null);
    api
      .fetchLearner(text)
      .then((res) => {
        console.log("Received Learner:", res);
        setLearnerResult(res);
      })
      .catch((e) => {
        console.log("Error fetching Learner: ", e);
        setLearnerResult('No results found...');
      });
  }
  const classbatchSearch = (text) => {
    setClassBatchResult(null);
    api
      .fetchClassBatch(text)
      .then((res) => {
        console.log("Received ClassBatch:", res);
        setClassBatchResult(res);
      })
      .catch((e) => {
        console.log("Error fetching ClassBatch: ", e);
        setClassBatchResult('No results found...');
      });
  }

  return (
    <div className="App">
      <h2>Van Robotics Course Manager</h2>
      <div className='mt-4'>
        <h3>
          Find Learner by id
        </h3>
      </div>
      <div className='search-container'>
        <Form.Control
          type="text"
          placeholder='Enter Learner id'
          onChange={(e) => setLearnerSearchText(e.target.value)}
          value={learnerSearchText}
          className='search-input'
        />
        <Button
          onClick={() => learnerSearch(learnerSearchText)}
        >
          Search
        </Button>
      </div>
      <div>
        {learnerResult && learnerResult.id && (
          <React.Fragment>
            <p>
              {"Results:"}
            </p>
            <div>
              <p>
                {"Learner " + learnerResult.id + ": "}
                <Link
                  to={{
                    pathname: `/learner/${learnerResult.id}`,
                  }}
                >
                  {learnerResult.first_name} {learnerResult.last_name}
                </Link>
              </p>
            </div>
          </React.Fragment>
        )}
        {learnerResult && !learnerResult.id && (
          <p>
            No results found...
          </p>
        )}
      </div>

      {totalLearners && totalLearners.length > 0 && (
        <Link to="/learner">{`See All Learners (${totalLearners.length})`}</Link>
      )}

      <div className='mb-3 mt-3'>
        <p>OR</p>
      </div>

      <div className='mb-3'>
        <h3>
          Find ClassBatch by id
        </h3>
      </div>
      <div className='search-container'>
        <Form.Control
          type="text"
          placeholder='Enter ClassBatch id'
          className='search-input'
          onChange={(e) => setClassBatchSearchText(e.target.value)}
          value={classbatchSearchText}
        />
        <Button
          onClick={() => classbatchSearch(classbatchSearchText)}
        >
          Search
        </Button>
      </div>
      <div>
        {classbatchResult && classbatchResult.id && (
          <React.Fragment>
            <p>
              {"Results:"}
            </p>
            <div>
              <p>
                {"ClassBatch " + classbatchResult.id + ": "}
                <Link
                  to={{
                    pathname: `/classbatch/${classbatchResult.id}`,
                  }}
                >
                  {classbatchResult.name}
                </Link>
              </p>
            </div>
          </React.Fragment>
        )}
        {classbatchResult && !classbatchResult.id && (
          <p>
            No results found...
          </p>
        )}

        <Link to='/classBatch'>See All Classes</Link>
      </div>
    </div>
  );
}

export default compose(
  withAPI
)(Welcome);

