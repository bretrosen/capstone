import { NavLink } from 'react-router-dom';
import './Footer.css'

export default function Footer() {
    return (
        <div className='footer'>
            <div className='left-footer'>
                <div className='footer-heading'>
                    SITE
                </div>
                <NavLink className='footer-link' to='/guidelines'>Site Guidelines</NavLink>
            </div>
            <div className='middle-footer'>
                <div className='footer-heading'>
                    LEGAL
                </div>
                <NavLink className='footer-link' to='/terms'>Terms & Conditions</NavLink>
            </div>
            <div className='right-footer'>
                <div className='footer-heading'>
                    CREATOR
                </div>
                <a className='footer-link' href='https://www.linkedin.com/in/bret-rosen-147a281b7/' target='_blank' rel='noreferrer'>My Linkedin</a>
                <a className='footer-link' href='https://github.com/bretrosen' target='_blank' rel='noreferrer'>My GitHub</a>

            </div>
        </div>
    )
}
