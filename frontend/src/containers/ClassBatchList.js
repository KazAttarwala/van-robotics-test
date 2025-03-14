import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useParams, Link } from 'react-router-dom';
import withAPI from '../services/api';

import logo from '../static/logo.svg';
import '../App.css';
import Loading from '../common/Loading';

const ClassBatchList = ({ api }) => {

  const params = useParams();
  const modelFields = [
    'id', 'first_name', 'last_name', 'grade', 'classbatch'
  ]

  const [classBatchList, setClassBatchList] = useState(null);

  //put this in a separate file and import it here  (and in LearnerList.js) to avoid duplication
  const fetchInfo = () => {
    setClassBatchList(null);
    api
      .fetchClassBatchList()
      .then((res) => {
        console.log("Received ClassBatches:", res);
        setClassBatchList(res);
      })
      .catch((e) => {
        console.log("Error fetching ClassBatches: ", e);
        setClassBatchList(null);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <h1>All Classes:</h1>
      {!classBatchList && (
        <Loading />
      )}
      <div>
        {classBatchList && classBatchList.length > 0 && (
          classBatchList.map((classBatch) => (
            <div>
              <Link to={`/classBatch/${classBatch.id}`}>
                {classBatch.name}
              </Link>
            </div>
          ))
        )}
        {classBatchList && classBatchList.length === 0 && (
          <strong>
            No Classes found...
          </strong>
        )}
      </div>
    </div>
  );
}

export default compose(
  withAPI
)(ClassBatchList);
