import queryString from 'query-string';

export const withQuery = (url, query) => {
    return queryString.stringifyUrl({ url, query }, { arrayFormat: 'comma' })
}

export const withQueryStr = (queryObj) => {
    return queryString.stringify(queryObj, { arrayFormat: 'comma' });
}