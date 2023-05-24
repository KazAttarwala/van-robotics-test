import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useParams, Link } from 'react-router-dom';
import withAPI from '../services/api';

import logo from '../static/logo.svg';
import '../App.css';

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
        console.log("Received ClassBatches:",res);
        setClassBatchList(res);
      })
      .catch((e) => {
        console.log("Error fetching ClassBatches: ",e);
        setClassBatchList(null);
      });
  };

  //put this in a separate file and import it here  (and in LearnerList.js) to avoid duplication
//   const deleteLearner = (lid) => {
//     api
//       .deleteLearner(lid)
//       .then((res) => {
//         console.log("Deleted Learner:",res);
//         fetchInfo();
//       })
//       .catch((e) => {
//         console.log("Error deleting Learner: ",e);
//       });
//   };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <div>
        <p>
          All Classes
        </p>
      </div>
      <div>
        {classBatchList && classBatchList.length > 0 ? (
          classBatchList.map((classBatch) => (
            <div>
              <Link to={`/classBatch/${classBatch.id}`}>
                {classBatch.name}
              </Link>
              {/* <button
                onClick={() => deleteLearner(classBatch.id)}
              >
                Delete
              </button> */}
            </div>
          ))
        ) : 
        (
          <p>
            No Classes found...
          </p>
        )}
      </div>
    </div>
  );
}

export default compose(
  withAPI
)(ClassBatchList);
