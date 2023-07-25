import { NavLink } from 'react-router-dom';

export const ProfList = ({prof, search, setSearch, setLastName, setFirstName}) => {

    if (prof.last_name.toLowerCase().startsWith(search.toLowerCase())) {
        setLastName(prof.last_name)
    }

    if (prof.first_name.toLowerCase().startsWith(search.toLowerCase())) {
        setFirstName(prof.first_name)
    }

    if (search.length === 0) {
        setLastName('')
        setFirstName('')
    }

    const closeMenu = () => setSearch('')

    return (
        <>
            {(prof.last_name.toLowerCase().startsWith(search.toLowerCase())  ||
             prof.first_name.toLowerCase().startsWith(search.toLowerCase()))
            &&
            <div className='search-results-name'>
                <NavLink exact to={`/profs/${prof.id}`} onClick={closeMenu}>{prof.first_name} {prof.last_name}
                <div className='search-results-field'>
                {prof.field}
                </div>
                </NavLink>
            </div>}
        </>
    )
}
