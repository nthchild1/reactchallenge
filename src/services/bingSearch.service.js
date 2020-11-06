import axios from 'axios';

class BingSearchService {
    constructor() {
        this.API_KEY = process.env.REACT_APP_BING_KEY;
        this.BING_API_URL = process.env.REACT_APP_BING_API_URL;
    }

    getSearchResults = (searchString, queries) => {
        return this.GETResource(searchString, {...queries,
            q: searchString
        })
    }

    GETResource(searchString, queries = {}) {
        const url = `${this.BING_API_URL}${queries && Object.keys(queries).length > 0
            ? Object.keys(queries).reduce(
                (queryString, queryName, index) => `${queryString}${index !== 0 ? '&' : ''}${queryName}=${queries[queryName]}`, '?',
            )
            : ''}`;
        return axios.get(url,{headers: { 'Ocp-Apim-Subscription-Key': this.API_KEY }}).then(({ data }) => data);
    }
}
export default BingSearchService;