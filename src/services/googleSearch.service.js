import axios from 'axios';

class GoogleSearchService {
    constructor() {
        this.API_KEY = process.env.REACT_APP_GOOGLE_KEY;
        this.GOOGLE_API_URL = process.env.REACT_APP_GOOGLE_API_URL;
        this.SEARCH_ENGINE_ID = process.env.REACT_APP_SEARCH_ENGINE_ID;
    }

    getSearchResults = (searchString, queries, num, page) => {
        return this.GETResource(searchString, {...queries,
            key: this.API_KEY,
            cx: this.SEARCH_ENGINE_ID,
            q: searchString,
            start: (page - 1) * num,
            num,
        })
    }

    GETResource(searchString, queries = {}) {
        const url = `${this.GOOGLE_API_URL}${queries && Object.keys(queries).length > 0
            ? Object.keys(queries).reduce(
                (queryString, queryName, index) => `${queryString}${index !== 0 ? '&' : ''}${queryName}=${queries[queryName]}`, '?',
            )
            : ''}`;
        return axios.get(url).then(({ data }) => data);
    }

}
export default GoogleSearchService;
