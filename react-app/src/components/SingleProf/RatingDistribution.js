import React from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

const RatingDistribution = () => {
    const { profId } = useParams()
    const profsObj = useSelector(state => state.profs.allProfs)
    const profsArray = Object.values(profsObj)
}

export default RatingDistribution
