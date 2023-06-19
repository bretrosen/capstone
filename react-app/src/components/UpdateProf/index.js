import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProfForm } from '../CreateProf'

export const UpdateProfForm = () => {
    const { profId } = useParams()
    const profs = Object.values(useSelector(state => state.profs.allProfs))
    const prof = profs.find(p => p.id === parseInt(profId))
    console.log("prof to update from update form ======>", prof)
    console.log("prof to delete's id from update form ======>", prof.id)

    if (!prof) {
        return <h1>Loading...</h1>


    }

    // pass prof data to form to populate fields for update
    // pass form type to allow form to dispatch a different thunk for updating

    return (
        Object.keys(prof).length > 1 && (
            <>
            <ProfForm prof={[prof]} formType='Update' />
            </>
        )
    )
}
