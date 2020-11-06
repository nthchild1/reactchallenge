import React from 'react';
import PropTypes from 'prop-types';
import {colors} from "../../app/constants/constants";

const SearchResult = props => {
    console.log(props);

    const {pagemap} = props;
    let image;

    if (pagemap && 'cse_image' in pagemap){
        image = pagemap.cse_image[0].src;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {image ? <img src={image} style={{flex: 0.5, height: '200px', width: '200px'}}/> : <div style={{height: '200px', width: '200px', backgroundColor: 'gray', margin: '20px'}}/>}
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: colors.foxGray, margin: '1%', cursor: 'pointer'}} onClick={() => window.open(props.link)}>
                <div>
                    {props.title}
                </div>
                <div>
                    {props.snippet}
                </div>
                <div>
                    {props.displayLink}
                </div>
            </div>
        </div>
    );
};

SearchResult.propTypes = {

};

export default SearchResult;