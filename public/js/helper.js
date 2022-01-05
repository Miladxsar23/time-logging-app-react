const helpers = (function() {
    function renderElapsedString(elapsed, runingSince) {
        let total = elapsed;
        if(runingSince) total += Date.now() - runingSince;
        let seconds = Math.floor((elapsed / 1000) % 60);
        let minutes = Math.floor((elapsed / 1000 / 60) % 60);
        let hours = Math.floor((elapsed / 1000 / 60 /60));
        const res = [
            pad(hours.toString(), 2),
            pad(minutes.toString(), 2),
            pad(seconds.toString(), 2)
        ].join(":")
        return res
    }
    function pad(str, size) {
        while(str.length < size) {
            str = '0' + str;
        }
        return str;
    }
    // craete a new Timer Object
    function newTimer(attr = {}) {
        const timer = {
            title : attr.title || 'Timer',
            project : attr.project || "Project",
            id : uuidv4(),
            elapsed : 0
        }
        return timer;
    }
    return {
        renderElapsedString,
        newTimer
    }
})();