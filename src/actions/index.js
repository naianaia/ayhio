
export const filterFlow = (keys, tag) => {
    return {
        type: 'filter_data',
        payload: {"filters": keys, "tag": tag }
    }
}

export const filterClear = () => {
    return {
        type: 'get_data',
        payload: null
    }
}