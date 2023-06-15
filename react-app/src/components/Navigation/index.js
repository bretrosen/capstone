import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { getAllReviewsThunk } from '../../store/reviews'
import './Navigation.css';

function Navigation({ isLoaded }){
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user)
	const { user } = useSelector(state => state)


	useEffect(() => {
		dispatch(getAllReviewsThunk)
		console.log("get all reviews thunk in nav ran")
	}, [dispatch, sessionUser])

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
