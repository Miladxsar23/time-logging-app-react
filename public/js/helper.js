const helpers = (function () {
    function renderElapsedString(elapsed, runningSince) {
        let totalElapsed = elapsed;
        if (runningSince) {
            totalElapsed += Date.now() - runningSince;
        }
        return millisecondsToHuman(totalElapsed);
    }
    function millisecondsToHuman(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor(ms / 1000 / 60 / 60);

        const humanized = [
            pad(hours.toString(), 2),
            pad(minutes.toString(), 2),
            pad(seconds.toString(), 2),
        ].join(':');

        return humanized;
    }

    function pad(numberString, size) {
        let padded = numberString;
        while (padded.length < size) padded = `0${padded}`;
        return padded;
    }
    // craete a new Timer Object
    function newTimer(attr = {}) {
        const timer = {
            title: attr.title || 'Timer',
            project: attr.project || "Project",
            id: uuidv4(),
            elapsed: 0
        }
        return timer;
    }
    return {
        renderElapsedString,
        newTimer
    }
})();