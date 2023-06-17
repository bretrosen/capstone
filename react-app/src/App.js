import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { ReviewList } from './components/Reviews'
import { SingleReview } from './components/SingleReview'
import { ReviewForm } from './components/CreateReview'
import { LandingPage } from './components/LandingPage'
import { UpdateReviewForm } from './components/UpdateReview'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // retains session user info after a refresh
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/reviews/:reviewId/edit'>
            <UpdateReviewForm />
          </Route>
          <Route path='/reviews/new'>
            <ReviewForm />
          </Route>
          <Route path='/reviews/:reviewId'>
            <SingleReview />
          </Route>
          <Route path='/reviews'>
            <ReviewList />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
