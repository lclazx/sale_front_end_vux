export default {
    splitSearch() {
        var search = window.location.search;
        var pattern = /\w(\w+)?=\w([^&]+)?/g;
        var result = {};
        do {
            let match = pattern.exec(search)
            if (!match)
                break;
            var kvp = match[0].split('=');
            result[kvp[0]] = kvp[1];
        } while (true);
        return result;
    }
}