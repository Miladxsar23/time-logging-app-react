const express = require("express")
const bodyParser = require("body-parser")
const { readFile, writeFile } = require("fs")
const path = require("path")
const { timers } = require("jquery")
const { json } = require("body-parser")
const DATA_FILE = path.join(__dirname, "data.json")
// configuration express
const app = express();
app.set("port", 8081);
app.set("ip", process.env.IP || "localhost")
app.use("/", express.static(path.join(__dirname, "public")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// define routes
app.get("/api/timers", (req, res) => {
    readFile(DATA_FILE, (err, timers) => {
        if (err)
            throw err;
        else
            res.setHeader("Cache-Control", "no-cache");
        res.json(JSON.parse(timers))
    })
})

// create timer
app.post("/api/timers", (req, res) => {
    {
        readFile(DATA_FILE, (err, data) => {
            if (err)
                throw err;
            else {
                let timers = JSON.parse(data);
                let newTimer = {
                    title: req.body.title,
                    project: req.body.project,
                    elapsed: 0,
                    id: req.body.id,
                    runningSince: null
                }
                timers.push(newTimer)
                writeFile(DATA_FILE, JSON.stringify(timers), () => {
                    res.setHeader("Cache-Control", "no-cache");
                    res.json(timers)
                })
            }
        })
    }
})

// start timer
app.post("/api/timers/start", (req, res) => {
    readFile(DATA_FILE, (err, data) => {
        if (err)
            throw err;
        else {
            let timers = JSON.parse(data)
            timers.forEach(timer => {
                if (timer.id === req.body.id)
                    timer.runningSince = req.body.runningSince;
            })
            writeFile(DATA_FILE, JSON.stringify(timers), () => {
                res.setHeader("Cache-Control", "no-cache")
                res.json({});
                res.end()
            })
        }
    })
})

// stop timer
app.post("/api/timers/stop", (req, res) => {
    readFile(DATA_FILE, (err, data) => {
        if (err)
            throw err;
        else {
            let timers = JSON.parse(data)
            timers.forEach(timer => {
                if (timer.id === req.body.id) {
                    timer.elapsed += (req.body.stop - timer.runningSince)
                    timer.runningSince = null
                }
            })
            writeFile(DATA_FILE, JSON.stringify(timers), () => {
                res.setHeader("Cache-Control", "no-cache");
                res.json({})
                json.end()
            })
        }
    })
})

// update timer
app.put("/api/timers", (req, res) => {
    readFile(DATA_FILE, (err, data) => {
        if (err)
            throw err;
        else {
            let timers = JSON.parse(data)
            timers.forEach(timer => {
                if (timer.id === req.body.id) {
                    timer.title = req.body.title;
                    timer.project = req.body.project;
                }
            })
            writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
                res.setHeader("Cache-Control", "no-cache");
                res.json({})
                res.end()
            })
        }
    })
})
// delete timer
app.delete("/api/timers", (req, res) => {
    readFile(DATA_FILE, (err, data) => {
        if (err)
            throw err;
        else {
            let timers = JSON.parse(data);
            let newTimers = timers.filter(timer => timer.id !== req.body.id)
            writeFile(DATA_FILE, JSON.stringify(newTimers), () => {
                res.setHeader("Cache-Control", "no-cache")
                res.json({})
                res.end()
            })
        }
    })
})

app.listen(app.get("port"), app.get("ip"), () => {
    console.log(`Find the server at: http://${app.get('ip')}:${app.get('port')}`); // eslint-disable-line no-console})
})