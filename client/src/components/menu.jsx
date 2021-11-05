import { withRouter } from "react-router"
import { Link } from "react-router-dom"

function Menu(props) {
  
    return (
        <div className="menu">

            <div className="logo-container">
            <svg className="logo" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnssvgjs="http://svgjs.com/svgjs"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-80 -20 640 640"><path d="M176 140c0-5.523-4.477-10-10-10s-10 4.477-10 10v70h-20v240h20v60c0 5.523 4.477 10 10 10s10-4.477 10-10v-60h20V210h-20zm140-40c0-5.523-4.477-10-10-10s-10 4.477-10 10v70h-20v240h20v60c0 5.523 4.477 10 10 10s10-4.477 10-10v-60h20V170h-20zM36 10c0-5.523-4.477-10-10-10S16 4.477 16 10v70H-4v240h20v60c0 5.523 4.477 10 10 10s10-4.477 10-10v-60h20V80H36zm440 280h-20v-70c0-5.523-4.477-10-10-10s-10 4.477-10 10v70h-20v240h20v60c0 5.523 4.477 10 10 10s10-4.477 10-10v-60h20zm0 0" className="color000 svgShape"/></svg></svg>
            <h1>Play with crypto</h1>
          </div>

          <div className="links-container">
            <Link to='/' className={props.location.pathname === '/' ? 'active' : ''} >
              <svg viewBox="0 0 24 24" fill='none'><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V9.75025L12.0002 4.75024L4.75024 9.75025V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"></path></svg>
              Accueil
            </Link>
            <Link to='/wallet' className={props.location.pathname === '/wallet' ? 'active' : ''} >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 8.25V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M16.5 13C16.5 13.2761 16.2761 13.5 16 13.5C15.7239 13.5 15.5 13.2761 15.5 13C15.5 12.7239 15.7239 12.5 16 12.5C16.2761 12.5 16.5 12.7239 16.5 13Z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 8.25H6.5C5.5335 8.25 4.75 7.4665 4.75 6.5C4.75 5.5335 5.5335 4.75 6.5 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V8.25ZM17.25 8.25H19.25"></path></svg>
              Portefeuille
            </Link>
            <Link to='/activity' className={props.location.pathname === '/activity' ? 'active' : ''} >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="15" cy="9" r="1" fill="currentColor"></circle><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.75H19.25V12L12.5535 18.6708C11.7544 19.4668 10.4556 19.445 9.68369 18.6226L5.28993 13.941C4.54041 13.1424 4.57265 11.8895 5.36226 11.1305L12 4.75Z"></path></svg>
              Activité
            </Link>
            <Link to='/need-funds' className={props.location.pathname === '/need-funds' ? 'active' : ''} >
              <svg fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.25 11.5V19.25M5.75 19.25V11.5M9.75 19.25V11.5M14.25 19.25V11.5"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.75L19.25 11.25H4.75L12 4.75Z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 19.25H19.25"></path></svg>
              Besoin d'argent
            </Link>
            <Link to='/issue' className={props.location.pathname === '/issue' ? 'active' : ''} >
              <svg fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V14.25C19.25 15.3546 18.3546 16.25 17.25 16.25H14.625L12 19.25L9.375 16.25H6.75C5.64543 16.25 4.75 15.3546 4.75 14.25V6.75Z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8V10"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12.5 13C12.5 13.2761 12.2761 13.5 12 13.5C11.7239 13.5 11.5 13.2761 11.5 13C11.5 12.7239 11.7239 12.5 12 12.5C12.2761 12.5 12.5 12.7239 12.5 13Z"></path></svg>
              Signaler un bug
            </Link>
          </div>

          <div className="bottom-menu-container">
            <Link to='/settings' style={props.location.pathname === '/settings' ? {opacity: 1} : {}} >
              <svg fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 8H7.25"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.75 8H19.25"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 16H12.25"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.75 16H19.25"></path><circle cx="10" cy="8" r="2.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></circle><circle cx="15" cy="16" r="2.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></circle></svg>
              Paramètres
            </Link>
            <Link to='/about' style={props.location.pathname === '/about' ? {opacity: 1} : {}} >
              <svg fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12Z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 10C9.75 10 10 7.75 12 7.75C14 7.75 14.25 9 14.25 10C14.25 10.7513 13.8266 11.5027 12.9798 11.8299C12.4647 12.0289 12 12.4477 12 13V13.25"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12.5 16C12.5 16.2761 12.2761 16.5 12 16.5C11.7239 16.5 11.5 16.2761 11.5 16C11.5 15.7239 11.7239 15.5 12 15.5C12.2761 15.5 12.5 15.7239 12.5 16Z"></path></svg>
              À propos
            </Link>
            <Link to='/login' style={props.location.pathname === '/login' ? {opacity: 1} : {}}>
              <svg fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 8.75L19.25 12L15.75 15.25"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 12H10.75"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H15.25"></path></svg>
              Déconnexion
            </Link>
          </div>
          
        </div>
    )
}

export default withRouter(Menu)