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
    constructor(props) {
        super(props)
        this.state = {
            timerData: [{
                title: "Mow the lawn",
                project: "House Chores",
                elapsed: 5456099,
                id: "0a4a79cb-b06d-4cb1-883d-549a1e3b66d7"
            },
            {
                title: "Clear paper jam",
                project: "Office Chores",
                elapsed: 1273998,
                id: "a73c1d19-f32d-4aff-b470-cea4e792406a"
            },
            {
                title: "Ponder origins of universe",
                project: "Life Chores",
                id: "2c43306e-5b44-4ff8-8753-33c35adbd06f",
                elapsed: 11750,
                runningSince: 1456225941911
            }],
        }
    }
    render() {
        const { timerData } = this.state
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList timerData={timerData} />
                    <ToggleableTimerForm isOpen={true} />
                </div>
            </div>
        )
    }
}

//EditableTimerList -> container
class EditableTimerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editForm : []
        }
    }
    componentDidMount() {
        let stateEditFormList = [];
        this.props.timerData.forEach(item => stateEditFormList.push(false))
        this.setState({
            editForm : [...stateEditFormList]
        })
    }
    render() {
        const {editForm} = this.state;
        const { timerData } = this.props;
        const row = timerData.map((data, index) => {
            return (
                <EditableTimerForm
                    key={`timer-` + index}
                    title={data.title}
                    project={data.project}
                    elapsed={data.elapsed}
                    runingSince={data.runningSince || null}
                    editForm={editForm[index]}
                />
            )
        })
        return (
            <div className="timers">
                {row}
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
    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.isOpen
        }
    }
    render() {
        if (this.props.isOpen) {
            return (
                <TimerForm />
            )
        } else {
            return (
                <div className="ui basic content center aligned segment">
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
ReactDOM.render(<App />, document.querySelector("#root"))