import { NavLink } from "react-router-dom"
import "./LandingPage.css"

export const LandingPage = () => {

    return (
        <div className='landing-page'>
            <div className='get-started'>
                {/* <img className='man-book' src='/static/man-reading-book.jpeg' alt='man reading book'></img> */}
                    <div className='enter'>
                        <NavLink to='/reviews'>All Reviews</NavLink>
                        <br></br>
                        <NavLink to='/reviews/new'>New Review</NavLink>
                    </div>


            </div>
        </div>
    )
}
