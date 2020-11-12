import React from 'react'
import PropTypes from 'prop-types'

const SearchPagination = ({numberOfDisplayedPages, onBackClick, onNextClick, onIndexClick, selectedPage}) =>
    <div style={{display: 'flex', flexDirection: 'row', padding: '5%'}}>
        <button onClick={onBackClick}>
            {'<'}
        </button>
        <div>
            {Array(numberOfDisplayedPages).fill('').map((element, offset) => (
                <button
                    style={{backgroundColor: selectedPage === selectedPage + offset ? 'gray' : 'white'}}
                    onClick={() => onIndexClick(selectedPage + offset)}
                >
                    {selectedPage + offset}
                </button>)
            )}
        </div>
        <button onClick={onNextClick}>
            {'>'}
        </button>
    </div>


SearchPagination.propTypes = {
    numberOfDisplayedPages: PropTypes.number.isRequired,
    onBackClick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
    onIndexClick: PropTypes.func.isRequired,
    selectedPage: PropTypes.number
}

export default SearchPagination
