import './Footer.css'

export default function Footer() {
    return (
        <div className='footer'>
            <div className='left-footer'>
                <div className='footer-heading'>
                    SITE
                </div>
            </div>
            <div className='middle-footer'>
                <div className='footer-heading'>
                    LEGAL
                </div>
            </div>
            <div className='right-footer'>
                <div className='footer-heading'>
                    CREATOR
                </div>
                <a className='footer-link' href='https://www.linkedin.com/in/bret-rosen-147a281b7/'>My Linkedin</a>
                <a className='footer-link' href='https://github.com/bretrosen'>My GitHub</a>

            </div>
        </div>
    )
}
