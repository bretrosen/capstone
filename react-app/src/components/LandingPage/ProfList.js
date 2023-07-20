import { NavLink } from 'react-router-dom';

export const ProfList = ({prof, search, setSearch, setLastName}) => {

    if (prof.last_name.toLowerCase().startsWith(search.toLowerCase())) {
        setLastName(prof.last_name)
    }

    if (search.length === 0) {
        setLastName('')
    }

    const closeMenu = () => setSearch('')

    return (
        <>
            {prof.last_name.toLowerCase().startsWith(search.toLowerCase())
            &&
            <div>
                <NavLink exact to={`/profs/${prof.id}`} onClick={closeMenu}>{prof.last_name}</NavLink>
            </div>
            }
        </>
    )
}
