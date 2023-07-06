import React from 'react'
import { useSelector } from 'react-redux'
import { useModal } from "../../context/Modal"
import './ResolveDebate.css'

const ResolveDebate = ({prof1Id, prof2Id, prof1Intelligence, prof1Wisdom, prof1Knowledge, prof1Charisma, prof1Preparation, prof1Respect, prof2Intelligence, prof2Wisdom, prof2Knowledge, prof2Charisma, prof2Preparation, prof2Respect}) => {
    const { closeModal } = useModal()

    // to resolve debate
    // each prof rolls a rand 1-20 for each attribute
    // the prof with the higher attribute has the difference added to 1/subtracted from 20
    // (so if prof1 has int 12, prof2 has int 10, prof1 rolls 3-20, prof2 rolls 1-18)
    // sum the rolls, higher sum is the winner
    // ties allowed

    const intDiff = prof1Intelligence - prof2Intelligence
    const wisDiff = prof1Wisdom - prof2Wisdom
    const knowDiff = prof1Knowledge - prof2Knowledge
    const charDiff = prof1Charisma - prof2Charisma
    const prepDiff = prof1Preparation - prof2Preparation
    const resDiff = prof1Respect - prof2Respect

    const prof1IntRoll = Math.floor(Math.random() * 19 + 1)

}
