//App -> Complete container
class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <TimersDashbord />
            </div>
        )
    }
}

//TimerDashbord -> container
class TimersDashbord extends React.Component {
    render() {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList />
                    <ToggleableTimerForm isOpen={true} />
                </div>
            </div>
        )
    }
}

//EditableTimerList -> container
class EditableTimerList extends React.Component {
    render() {
        return (
            <div className="timers">
                <EditableTimerForm
                    title="react app"
                    project="the web app"
                    elapsed="8986300"
                    runingSince={null}
                    editForm={false}
                />
                <EditableTimerForm
                    title="learn extreme ironing"
                    project="world documantation"
                    elapsed="3890985"
                    runingSince={null}
                    editForm={true}
                />
            </div>
        )
    }
}
//EditableTimerForm -> container + condition rendering
class EditableTimerForm extends React.Component {
    render() {
        if (this.props.editForm) {
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
                    runingSince={this.props.runingSince}
                />
            )
        }
    }
}

//TimerForm -> action
class TimerForm extends React.Component {
    render() {
        let textContent = this.props.title ? "Update" : "Create";
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
                        <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic blue button">{textContent}</div>
                                <div className="ui basic red button">Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//ToggleableTimerForm -> condition render
class ToggleableTimerForm extends React.Component {
    render() {
        if (this.props.isOpen) {
            return (
                <TimerForm />
            )
        } else {
            return (
                <div className="ui basic content aligned segment">
                    <button className="ui basic button icon">
                        <i className="plus icon"></i>
                    </button>
                </div>
            )
        }
    }
}
//Timer -> container + action
class Timer extends React.Component {
    render() {
        const { title, project, elapsed, runingSince } = this.props;
        const elapsedString = helpers.renderElapsedString(elapsed, runingSince);
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="header">
                        {title}
                    </div>
                    <div className="meta">
                        {project}
                    </div>
                    <div className="center aligned description">
                        <h2>
                            {elapsedString}
                        </h2>
                    </div>
                    <div className="extra content">
                        <span className="right floated edit icon">
                            <i className="edit icon"></i>
                        </span>
                        <span className="right floated trash icon">
                            <i className="trash icon"></i>
                        </span>
                    </div>
                </div>
                <div className="ui bottom attached blue basic button" type="button">Start</div>
            </div>
        )
    }
}
ReactDOM.render(<App/>, document.querySelector("#root"))