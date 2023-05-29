import React, { useContext } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import withAPI from '../services/api';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Loading from '../common/Loading';
import { StateContext } from '../common/StateContext';

const LearnerList = ({ api }) => {
  const {totalLearners, setTotalLearners} = useContext(StateContext);

  //put this in a separate file and import it here (and in LearnerList.js) to avoid duplication
  const deleteLearner = (lid) => {
    api
      .deleteLearner(lid)
      .then((res) => {
        console.log("Deleted Learner:", res);
        const newTotalLearners = totalLearners.filter((learner) => learner.id !== lid);
        setTotalLearners(newTotalLearners);
      })
      .catch((e) => {
        console.log("Error deleting Learner: ", e);
      });
  };

  return (
    <div className="App">
      <h1>
        {`All Learners (${totalLearners ? totalLearners.length : '???'})`}
      </h1>
      {!totalLearners && (
        <Loading />
      )}
      <div>
        {totalLearners && totalLearners.length > 0 && (
          totalLearners.map((learner) => (
            <div className='content-container'>
              <Link to={`/learner/${learner.id}`}>
                {learner.first_name + " " + learner.last_name}
              </Link>
              <Button
                onClick={() => deleteLearner(learner.id)}
                className='btn btn-danger delete-button btn-sm'
              >
                Delete
              </Button>
            </div>
          ))
        )}
        {totalLearners && totalLearners.length === 0 && (
          <strong>
            No Learners found...
          </strong>
        )}
      </div>
    </div>
  );
}

export default compose(
  withAPI
)(LearnerList);
