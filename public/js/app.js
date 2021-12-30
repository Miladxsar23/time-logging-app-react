class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <TimersDashbord />
            </div>
        )
    }
}
// TimersDashbord -> container
class TimersDashbord extends React.Component {
    render() {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableFormList />
                    <ToggleableTimerForm isOpen={true} />
                </div>
            </div>
        )
    }
}
// EditableFormList -> container
class EditableFormList extends React.Component {
    render() {
        <div id="timers">
            <EditableTimer
                title="learn react"
                project="web Documentation"
                elapsed="8986300"
                runningSince={null}
                editFormOpen={false}
            />
            <EditableTimer
                title="learning extreme ironing"
                project="world domination"
                elapsed="3890985"
                editFormOpen={true}
            />
        </div>
    }
}

//EditableTimer -> container + action
class EditableTimer extends React.Component {
    render() {
        if (this.props.editFormOpen) {
            return (
                <TimerForm
                    title={this.props.title}
                    project={this.props.project}
                />
            )
        } else {
            return (
                <Timer
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                />
            )
        }
    }
}
// TimerForm -> action
class TimerForm extends React.Component {
    render() {
        const submitText = this.props.title ? "Update" : "Create";
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="ui form">
                        <div className="field">
                            <label>Title</label>
                            <input type="text" defaultValue={this.props.title} />
                        </div>
                        <div className="field">
                            <label>Project</label>
                            <input type="text" defaultValue={this.props.project} />
                        </div>
                        <div className="ui two bottom attached buttons">
                            <button className="ui basic blue button">
                                {submitText}
                            </button>
                            <button className="ui basic red button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.querySelector("#root"))