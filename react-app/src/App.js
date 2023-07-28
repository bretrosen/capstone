import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { ReviewList } from './components/Reviews'
import { SingleReview } from './components/SingleReview'
import { ReviewForm } from './components/CreateReview'
import { LandingPage } from './components/LandingPage'
import { UpdateReviewForm } from './components/UpdateReview'
import { ProfList } from './components/Profs'
import { SingleProf } from './components/SingleProf'
import { ProfForm } from './components/CreateProf'
import { UpdateProfForm } from './components/UpdateProf'
import { CurrentUserReviewList } from './components/UserReviews'
import { CourseList } from './components/Courses'
import { SingleCourse } from './components/SingleCourse'
import { CourseForm } from './components/CreateCourse'
import { UpdateCourseForm } from './components/UpdateCourse'
import { DebateList } from './components/Debates'
import { SingleDebate } from './components/SingleDebate'
import { DebateForm } from './components/CreateDebate'
import { Guidelines } from './components/Guidelines'
import { Terms } from './components/Terms'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // retains session user info after a refresh
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Route exact path='/'>
        <LandingPage />
      </Route>
      <Switch>
        <Route path='/reviews/:reviewId/edit'>
          <Navigation isLoaded={isLoaded} />
          <UpdateReviewForm />
        </Route>
        <Route path='/reviews/new'>
          <Navigation isLoaded={isLoaded} />
          <ReviewForm />
        </Route>
        <Route path='/reviews/current'>
          <Navigation isLoaded={isLoaded} />
          <CurrentUserReviewList />
        </Route>
        <Route path='/reviews/:reviewId'>
          <Navigation isLoaded={isLoaded} />
          <SingleReview />
        </Route>
        <Route path='/reviews'>
          <Navigation isLoaded={isLoaded} />
          <ReviewList />
        </Route>
        <Route path='/profs/:profId/edit'>
          <Navigation isLoaded={isLoaded} />
          <UpdateProfForm />
        </Route>
        <Route path='/profs/new'>
          <Navigation isLoaded={isLoaded} />
          <ProfForm />
        </Route>
        <Route path='/profs/:profId'>
          <Navigation isLoaded={isLoaded} />
          <SingleProf />
        </Route>
        <Route path='/profs'>
          <Navigation isLoaded={isLoaded} />
          <ProfList />
        </Route>
        <Route path='/courses/:courseId/edit'>
          <Navigation isLoaded={isLoaded} />
          <UpdateCourseForm />
        </Route>
        <Route path='/courses/new'>
          <Navigation isLoaded={isLoaded} />
          <CourseForm />
        </Route>
        <Route path='/courses/:courseId'>
          <Navigation isLoaded={isLoaded} />
          <SingleCourse />
        </Route>
        <Route path='/courses'>
          <Navigation isLoaded={isLoaded} />
          <CourseList />
        </Route>
        <Route path='/debates/new'>
          <Navigation isLoaded={isLoaded} />
          <DebateForm />
        </Route>
        <Route path='/debates/:debateId'>
          <Navigation isLoaded={isLoaded} />
          <SingleDebate />
        </Route>
        <Route path='/debates'>
          <Navigation isLoaded={isLoaded} />
          <DebateList />
        </Route>
        <Route path='/guidelines'>
          <Navigation isLoaded={isLoaded} />
          <Guidelines />
        </Route>
        <Route path='/terms'>
          <Navigation isLoaded={isLoaded} />
          <Terms />
        </Route>
        {/* <Route path="/login" >
            <LoginFormModal />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route> */}
      </Switch>

    </>
  );
}

export default App;
