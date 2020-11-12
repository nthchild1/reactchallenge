import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import EngineSelect from './EngineSelect'
import {useDispatch, useSelector} from 'react-redux'
import {
    getNextPage,
    getPage,
    getPreviousPage,
    setSearchString,
    submitSearch
} from '../../modules/searchAggregator/searchAggregator.thunks'
import SearchResults from './SearchResults'
import {colors} from '../../constants/constants'
import SearchPagination from '../../../components/SearchPagination/SearchPagination'
import Snackbar from "../../../components/Snackbar/Snackbar";

const MainPage = props => {
    const dispatch = useDispatch()
    const {currentPage} = useSelector(state => state.searchAggregator);
    const {error} = useSelector(state => state.app);


    const handleSearchSubmit = (event) => {
        event.preventDefault()
        dispatch(submitSearch())
    }
    const [snackbarIsVisible, setSnackbarIsVisible] = useState(false);

    useEffect(() => {
        if (error){
            setSnackbarIsVisible(true);
        }
    }, [error]);
    useEffect(() => {
        if (snackbarIsVisible === true){
            setTimeout(() => {
                setSnackbarIsVisible(false);
            },1500);
        }
    },[snackbarIsVisible]);


    const handleSearchStringChange = ({target}) => dispatch(setSearchString(target.value))

    return (
        <div>
            <form onSubmit={handleSearchSubmit}
                  style={{padding: '40px', display: 'block', backgroundColor: colors.simaBlue}}>
                <input type="text" onChange={handleSearchStringChange}/>
                <input type="submit"/>
                <EngineSelect/>
            </form>
            <SearchResults/>
            {snackbarIsVisible && <Snackbar error={error}/>}
            <SearchPagination
                numberOfDisplayedPages={4}
                selectedPage={currentPage}
                onBackClick={() => dispatch(getPreviousPage())}
                onIndexClick={(index) => dispatch(getPage(index))}
                onNextClick={() => dispatch(getNextPage())}
            />
        </div>
    )
}

MainPage.propTypes = {}

export default MainPage
