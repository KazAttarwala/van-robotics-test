//import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { StateProvider } from './common/StateContext';
import { compose } from 'redux';

import withAPI from './services/api';

import {
  Welcome,
  ClassBatch,
  ClassBatchList,
  Learner,
  LearnerList,
} from './containers';

const App = ({ api }) => {
  return (
    <StateProvider api={api}>
      <section className="main-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/learner/" element={<LearnerList />} />
            <Route path="/learner/:learnerId" element={<Learner />} />
            <Route path="/classbatch/:classbatchId" element={<ClassBatch />} />
            <Route path="/classbatch/" element={<ClassBatchList />} />
          </Routes>
        </BrowserRouter>
      </section>
    </StateProvider>
  );
}

export default compose(
  withAPI
)(App);
