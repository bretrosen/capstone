import React from 'react'
import { useSelector } from 'react-redux'
import { useModal } from "../../context/Modal"
import './ResolveDebate.css'

const ResolveDebate = ({ prof1Id, prof2Id, prof1Intelligence, prof1Wisdom, prof1Knowledge, prof1Charisma, prof1Preparation, prof1Respect, prof2Intelligence, prof2Wisdom, prof2Knowledge, prof2Charisma, prof2Preparation, prof2Respect }) => {
    const { closeModal } = useModal()
    const prof1 = useSelector(state => state.debates.singleDebate.prof1_first_name)
    const prof2 = useSelector(state => state.debates.singleDebate.prof2_first_name)

    // to resolve debate
    // each prof rolls a rand 1-20 for each attribute
    // the prof with the higher attribute has the difference added to 1
    // (so if prof1 has int 12, prof2 has int 10, prof1 rolls 3-20, prof2 rolls 1-20)
    // sum the rolls, higher sum is the winner
    // ties allowed

    const intDiff = Math.floor(prof1Intelligence - prof2Intelligence)
    const wisDiff = Math.floor(prof1Wisdom - prof2Wisdom)
    const knowDiff = Math.floor(prof1Knowledge - prof2Knowledge)
    const charDiff = Math.floor(prof1Charisma - prof2Charisma)
    const prepDiff = Math.floor(prof1Preparation - prof2Preparation)
    const resDiff = Math.floor(prof1Respect - prof2Respect)

    const prof1Rolls = {}
    const prof2Rolls = {}

    if (intDiff > 0) {
        const prof1IntRoll = Math.floor(Math.random() * (19 - intDiff) + intDiff + 1)
        const prof2IntRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Intelligence'] = prof1IntRoll
        prof2Rolls['Intelligence'] = prof2IntRoll
    } else if (intDiff < 0) {
        const prof2IntRoll = Math.floor(Math.random() * (19 - intDiff) + intDiff + 1)
        const prof1IntRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Intelligence'] = prof1IntRoll
        prof2Rolls['Intelligence'] = prof2IntRoll
    } else {
        const prof1IntRoll = Math.floor(Math.random() * 19 + 1)
        const prof2IntRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Intelligence'] = prof1IntRoll
        prof2Rolls['Intelligence'] = prof2IntRoll
    }

    if (wisDiff > 0) {
        const prof1WisRoll = Math.floor(Math.random() * (19 - wisDiff) + wisDiff + 1)
        const prof2WisRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Wisdom'] = prof1WisRoll
        prof2Rolls['Wisdom'] = prof2WisRoll
    } else if (wisDiff < 0) {
        const prof2WisRoll = Math.floor(Math.random() * (19 - wisDiff) + wisDiff + 1)
        const prof1WisRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Wisdom'] = prof1WisRoll
        prof2Rolls['Wisdom'] = prof2WisRoll
    } else {
        const prof1WisRoll = Math.floor(Math.random() * 19 + 1)
        const prof2WisRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Wisdom'] = prof1WisRoll
        prof2Rolls['Wisdom'] = prof2WisRoll
    }

    if (knowDiff > 0) {
        const prof1KnowRoll = Math.floor(Math.random() * (19 - knowDiff) + knowDiff + 1)
        const prof2KnowRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Knowledge'] = prof1KnowRoll
        prof2Rolls['Knowledge'] = prof2KnowRoll
    } else if (knowDiff < 0) {
        const prof2KnowRoll = Math.floor(Math.random() * (19 - knowDiff) + knowDiff + 1)
        const prof1KnowRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Knowledge'] = prof1KnowRoll
        prof2Rolls['Knowledge'] = prof2KnowRoll
    } else {
        const prof1KnowRoll = Math.floor(Math.random() * 19 + 1)
        const prof2KnowRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Knowledge'] = prof1KnowRoll
        prof2Rolls['Knowledge'] = prof2KnowRoll
    }

    if (charDiff > 0) {
        const prof1CharRoll = Math.floor(Math.random() * (19 - charDiff) + charDiff + 1)
        const prof2CharRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Charisma'] = prof1CharRoll
        prof2Rolls['Charisma'] = prof2CharRoll
    } else if (charDiff < 0) {
        const prof2CharRoll = Math.floor(Math.random() * (19 - charDiff) + charDiff + 1)
        const prof1CharRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Charisma'] = prof1CharRoll
        prof2Rolls['Charisma'] = prof2CharRoll
    } else {
        const prof1CharRoll = Math.floor(Math.random() * 19 + 1)
        const prof2CharRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Charisma'] = prof1CharRoll
        prof2Rolls['Charisma'] = prof2CharRoll
    }

    if (prepDiff > 0) {
        const prof1PrepRoll = Math.floor(Math.random() * (19 - prepDiff) + prepDiff + 1)
        const prof2PrepRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Preparation'] = prof1PrepRoll
        prof2Rolls['Preparation'] = prof2PrepRoll
    } else if (prepDiff < 0) {
        const prof2PrepRoll = Math.floor(Math.random() * (19 - prepDiff) + prepDiff + 1)
        const prof1PrepRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Preparation'] = prof1PrepRoll
        prof2Rolls['Preparation'] = prof2PrepRoll
    } else {
        const prof1PrepRoll = Math.floor(Math.random() * 19 + 1)
        const prof2PrepRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Preparation'] = prof1PrepRoll
        prof2Rolls['Preparation'] = prof2PrepRoll
    }

    if (resDiff > 0) {
        const prof1ResRoll = Math.floor(Math.random() * (19 - resDiff) + resDiff + 1)
        const prof2ResRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Respect'] = prof1ResRoll
        prof2Rolls['Respect'] = prof2ResRoll
    } else if (resDiff < 0) {
        const prof2ResRoll = Math.floor(Math.random() * (19 - resDiff) + resDiff + 1)
        const prof1ResRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Respect'] = prof1ResRoll
        prof2Rolls['Respect'] = prof2ResRoll
    } else {
        const prof1ResRoll = Math.floor(Math.random() * 19 + 1)
        const prof2ResRoll = Math.floor(Math.random() * 19 + 1)
        prof1Rolls['Respect'] = prof1ResRoll
        prof2Rolls['Respect'] = prof2ResRoll
    }

    const prof1Sum = (prof1Rolls['Intelligence'] + prof1Rolls['Knowledge'] + prof1Rolls['Wisdom'] + prof1Rolls['Charisma'] + prof1Rolls['Preparation'] + prof1Rolls['Respect']).toFixed(0)
    const prof2Sum = (prof2Rolls['Intelligence'] + prof2Rolls['Knowledge'] + prof2Rolls['Wisdom'] + prof2Rolls['Charisma'] + prof2Rolls['Preparation'] + prof2Rolls['Respect']).toFixed(0)

    return (
        <div className='resolve-debate-wrapper'>
            <div className='resolve-debate-row'>
                <div className='resolve-number'>{prof1Rolls['Intelligence'].toFixed(0)}</div>
                <div className='resolve-heading'>Intelligence</div>
                <div className='resolve-number'>{prof2Rolls['Intelligence'].toFixed(0)}</div>
            </div>

            <div className='resolve-debate-row'>
                <div className='resolve-number'>{prof1Rolls['Knowledge'].toFixed(0)}</div>
                <div className='resolve-heading'>Knowledge</div>
                <div className='resolve-number'>{prof2Rolls['Knowledge'].toFixed(0)}</div>
            </div>

            <div className='resolve-debate-row'>
                <div className='resolve-number'>{prof1Rolls['Wisdom'].toFixed(0)}</div>
                <div className='resolve-heading'>Wisdom</div>
                <div className='resolve-number'>{prof2Rolls['Wisdom'].toFixed(0)}</div>
            </div>

            <div className='resolve-debate-row'>
                <div className='resolve-number'>{prof1Rolls['Charisma'].toFixed(0)}</div>
                <div className='resolve-heading'>Charisma</div>
                <div className='resolve-number'>{prof2Rolls['Charisma'].toFixed(0)}</div>
            </div>

            <div className='resolve-debate-row'>
                <div className='resolve-number'>{prof1Rolls['Preparation'].toFixed(0)}</div>
                <div className='resolve-heading'>Preparation</div>
                <div className='resolve-number'>{prof2Rolls['Preparation'].toFixed(0)}</div>
            </div>

            <div className='resolve-debate-row'>
                <div className='resolve-number'>{prof1Rolls['Respect'].toFixed(0)}</div>
                <div className='resolve-heading'>Respect</div>
                <div className='resolve-number'>{prof2Rolls['Respect'].toFixed(0)}</div>
            </div>

            {/* <p>{prof1} rolled a {prof1Rolls['Knowledge'].toFixed(0)} for Knowledge.</p>
            <p>{prof2} rolled a {prof2Rolls['Knowledge'].toFixed(0)} for Knowledge.</p>
            <p>{prof1} rolled a {prof1Rolls['Wisdom'].toFixed(0)} for Wisdom.</p>
            <p>{prof2} rolled a {prof2Rolls['Wisdom'].toFixed(0)} for Wisdom.</p>
            <p>{prof1} rolled a {prof1Rolls['Charisma'].toFixed(0)} for Charisma.</p>
            <p>{prof2} rolled a {prof2Rolls['Charisma'].toFixed(0)} for Charisma.</p>
            <p>{prof1} rolled a {prof1Rolls['Preparation'].toFixed(0)} for Preparation.</p>
            <p>{prof2} rolled a {prof2Rolls['Preparation'].toFixed(0)} for Preparation.</p>
            <p>{prof1} rolled a {prof1Rolls['Respect'].toFixed(0)} for Respect.</p>
            <p>{prof2} rolled a {prof2Rolls['Respect'].toFixed(0)} for Respect.</p> */}

            <div className='resolve-debate-row'>
                <div className='resolve-number'>{prof1Sum}</div>
                <div className='resolve-heading'>Total</div>
                <div className='resolve-number'>{prof2Sum}</div>
            </div>
            {prof1Sum > prof2Sum &&
                <div className='resolve-winner'>{prof1} is the winner!</div>}
            {prof1Sum < prof2Sum &&
                <div className='resolve-winner'>{prof2} is the winner!</div>}
            {prof1Sum === prof2Sum &&
                <div className='resolve-tie'>Holy smokes! It was a tie!</div>}
        </div>
    )
}

export default ResolveDebate
