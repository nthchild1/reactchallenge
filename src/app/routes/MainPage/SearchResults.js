import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import SearchResult from '../../../components/SearchResult/SearchResult'

const SearchResults = props => {
  const { searchResults } = useSelector(state => state.searchAggregator)

  const { items } = searchResults

  return (
        <div>
            {SearchResults && <div style={{ display: 'flex', flexDirection: 'column' }}>
                {items && items.map(item => (<SearchResult key={item.displayLink} {...item} />))}
            </div>}
        </div>
  )
}

SearchResults.propTypes = {

}

export default SearchResults
