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
import Footer from './components/Footer'

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
          <Footer />
        </Route>
        <Route path='/reviews/new'>
          <Navigation isLoaded={isLoaded} />
          <ReviewForm />
          <Footer />
        </Route>
        <Route path='/reviews/current'>
          <Navigation isLoaded={isLoaded} />
          <CurrentUserReviewList />
          <Footer />
        </Route>
        <Route path='/reviews/:reviewId'>
          <Navigation isLoaded={isLoaded} />
          <SingleReview />
          <Footer />
        </Route>
        <Route path='/reviews'>
          <Navigation isLoaded={isLoaded} />
          <ReviewList />
          <Footer />
        </Route>
        <Route path='/profs/:profId/edit'>
          <Navigation isLoaded={isLoaded} />
          <UpdateProfForm />
          <Footer />
        </Route>
        <Route path='/profs/new'>
          <Navigation isLoaded={isLoaded} />
          <ProfForm />
          <Footer />
        </Route>
        <Route path='/profs/:profId'>
          <Navigation isLoaded={isLoaded} />
          <SingleProf />
          <Footer />
        </Route>
        <Route path='/profs'>
          <Navigation isLoaded={isLoaded} />
          <ProfList />
          <Footer />
        </Route>
        <Route path='/courses/:courseId/edit'>
          <Navigation isLoaded={isLoaded} />
          <UpdateCourseForm />
          <Footer />
        </Route>
        <Route path='/courses/new'>
          <Navigation isLoaded={isLoaded} />
          <CourseForm />
          <Footer />
        </Route>
        <Route path='/courses/:courseId'>
          <Navigation isLoaded={isLoaded} />
          <SingleCourse />
          <Footer />
        </Route>
        <Route path='/courses'>
          <Navigation isLoaded={isLoaded} />
          <CourseList />
          <Footer />
        </Route>
        <Route path='/debates/new'>
          <Navigation isLoaded={isLoaded} />
          <DebateForm />
          <Footer />
        </Route>
        <Route path='/debates/:debateId'>
          <Navigation isLoaded={isLoaded} />
          <SingleDebate />
          <Footer />
        </Route>
        <Route path='/debates'>
          <Navigation isLoaded={isLoaded} />
          <DebateList />
          <Footer />
        </Route>
        <Route path='/guidelines'>
          <Navigation isLoaded={isLoaded} />
          <Guidelines />
        </Route>
        <Route path='/terms'>
          <Navigation isLoaded={isLoaded} />
          <Terms />
        </Route>
      </Switch>
    </>
  );
}

export default App;
