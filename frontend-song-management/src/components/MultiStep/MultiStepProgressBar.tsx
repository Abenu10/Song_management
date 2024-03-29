import React from 'react'
import './MultiStepProgressBar.css'
import { ProgressBar, Step } from 'react-step-progress-bar'

interface MultiStepProgressBarProps {
    page: string
    onPageNumberClick: (pageNumber: string) => void
}

const MultiStepProgressBar: React.FC<MultiStepProgressBarProps> = ({
    page,
    onPageNumberClick,
}) => {
    let stepPercentage = 0
    if (page === 'pageone') {
        stepPercentage = 50
    } else if (page === 'pagetwo') {
        stepPercentage = 100
    } else {
        stepPercentage = 0
    }

    return (
        <ProgressBar percent={stepPercentage}>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${
                            accomplished ? 'accomplished' : ''
                        }`}
                        onClick={() => onPageNumberClick('1')}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${
                            accomplished ? 'accomplished' : ''
                        }`}
                        onClick={() => onPageNumberClick('2')}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
        </ProgressBar>
    )
}

export default MultiStepProgressBar
