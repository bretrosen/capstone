import React from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
// import { Line } from 'react-chartjs-2';

const RatingDistribution = () => {
    const { profId } = useParams()
    const profsObj = useSelector(state => state.profs.allProfs)
    const profQualityArray = profsObj[profId].qualities


    return (
        <>
        <ul>
            {profQualityArray.map((quality) => (
                <li>Quality: {quality.toFixed(1)}</li>
            ))}
        </ul>
        </>
    )

}

export default RatingDistribution
