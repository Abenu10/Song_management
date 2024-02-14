import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledInput = styled.input`
    padding: 10px;
    /* Add playful spirit: */
    background-color: #f0f8ff;
    border: 1px solid #c0c0ff;

    font-size: 16px;
    outline: none;
    box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
    transition: 0.2s ease-in-out;
    border-radius: 8px; /* Rounded corners */

    &:focus {
        box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
        border-color: #9090ff;
    }
}`

export const Categories = [
    'R&B',
    'Electronic',
    'Rock',
    'Rap',
    'country/Ethiopia',
    'Pop',
    'Hip',
]

export const StyledSelect = styled.select`
    padding: 10px;
    /* Add playful spirit: */
    background-color: #f0f8ff;
    border: 1px solid #c0c0ff;

    font-size: 16px;
    outline: none;
    box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
    transition: 0.2s ease-in-out;
    border-radius: 8px; /* Rounded corners */

    /* Playful font */
    font-size: 18px;

    /* Playful animations on focus */
    &:focus {
        outline: none;
        box-shadow: 0 0 5px rgba(0, 0, 255, 0.2);
    }
}`

export const StyledOption = styled.option`
     
      color: #333;
      padding: 10px;
      border-radius: 5px;
  
      &:hover {
        background: red;
      }
    }
  `

export const StyledButton = styled.button`
    padding: 10px;
    /* Add playful spirit: */
    color: #e1f2f7;
    background-color: #bd1e51;
    border: 1px solid #c0c0ff;
    font-size: 16px;
    outline: none;
    box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
    transition: 0.2s ease-in-out;
    border-radius: 8px; /* Rounded corners */
    cursor: pointer; /* Ensure cursor changes on hover */

    &:hover {
        background-color: #980030;
    }

    &:focus {
        box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
        border-color: #9090ff;
    }

    transition: 0.4s;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
}
`
export const StyledForm = styled.form``

export interface InputChangeEvent {
    target: {
        name: string
        value: string
    }
}

export const genreStyles = css`
        gap: 12px;
        flex-wrap: wrap;
        width: 100%;

        @media screen and (min-width: 768px) {
            width: 450px; /* Adjust width for larger screens */
        }
    `
export const spinnerStyles = css`
        border: 3px solid rgba(0, 0, 0, 0.1);
        border-top: 3px solid #007bff;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
        margin-left: 10px;

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `