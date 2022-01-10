// create abstraction layer of fetch for timers
'use strict'
const client = function () {
    const baseURL = "http://localhost:8081/api/timers";
    //get data
    async function getTimers() {
        let res, response;
        try {
            res = await fetch(baseURL, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                },
                cache: "no-cache"
            })
            response = await res.json()
            return response
        } catch (e) {
            throw e;
        }
    }
    //post data
    async function createTimer(data) {
        let res;
        try {
            res = await fetch(baseURL, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            return checkStatus(res)
        } catch (err) {
            throw err
        }
    }
    async function startTimer(data) {
        let res;
        try {
            res = await fetch(baseURL + "/start", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            return checkStatus(res)
        } catch (e) {
            throw e;
        }
    }
    async function stopTimer(data) {
        let res;
        try {
            res = await fetch(baseURL + "/stop", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            return checkStatus(res)
        } catch (e) {
            throw e;
        }
    }

    async function deleteTimer(data) {
        let res;
        try {
            res = await fetch(baseURL, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            return checkStatus(res)
        } catch (e) {
            throw e;
        }
    }
    async function updateTimer(data) {
        let res;
        try {
            res = await fetch(baseURL, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            return checkStatus(res)
        } catch (e) {
            throw e;
        }
    }

    function checkStatus(response) {
        if (response.status >= 200 && response.status <= 300) {
            return response
        }
        else {
            let err = new Error(`Http Error ${response.status}`)
            err.status = response.status;
            err.response = response;
            throw err
        }
    }
    return {
        getTimers,
        createTimer,
        startTimer,
        stopTimer,
        updateTimer,
        deleteTimer
    }
}()

