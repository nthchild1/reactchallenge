import axios from 'axios';

class BingSearchService {
    constructor() {
        this.API_KEY = process.env.REACT_APP_BING_KEY;
        this.GOOGLE_API_URL = process.env.REACT_APP_BING_API_URL;
        this.SEARCH_ENGINE_ID = process.env.REACT_APP_SEARCH_ENGINE_ID;
    }

    getSearchResults = (searchString, queries) => {
        return this.GETResource(searchString, {...queries,
            key: this.API_KEY,
            cx: this.SEARCH_ENGINE_ID,
            q: searchString
        })
    }

    GETResource(searchString, queries = {}) {
        const url = `${this.GOOGLE_API_URL}${queries && Object.keys(queries).length > 0
            ? Object.keys(queries).reduce(
                (queryString, queryName, index) => `${queryString}${index !== 0 ? '&' : ''}${queryName}=${queries[queryName]}`, '?',
            )
            : ''}`;
        console.log(url)
        return axios.get(url).then(({ data }) => data);
    }
}
export default BingSearchService;