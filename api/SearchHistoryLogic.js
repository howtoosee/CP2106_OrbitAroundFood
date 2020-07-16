let searchHistory = [];

function addHistory(str) {
    searchHistory.filter(item => item !== str);
    searchHistory.unshift(str);
}

function clearHistory() {
    searchHistory = [];
}

function getHistory() {
    return searchHistory;
}


export {addHistory, clearHistory, getHistory};
