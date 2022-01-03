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
                id: uuidv4()
            },
            {
                title: "Clear paper jam",
                project: "Office Chores",
                elapsed: 1273998,
                id: uuidv4()
            },
            {
                title: "Ponder origins of universe",
                project: "Life Chores",
                id: uuidv4(),
                elapsed: 11750,
                runningSince: 1456225941911
            }]
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
    render() {
        const { timerData } = this.props;
        const row = timerData.map((data, index) => {
            return (
                <EditableTimerForm
                    key={data.id}
                    id={data.id}
                    title={data.title}
                    project={data.project}
                    elapsed={data.elapsed}
                    runingSince={data.runningSince || null}
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
    constructor(props) {
        super(props)
        this.state = {
            editForm: false
        }
    }
    render() {
        if (this.state.editForm) {
            return (
                <TimerForm
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                />
            )
        } else {
            return (
                <Timer
                    id={this.props.id}
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
    constructor(props) {
        super(props)
        this.state = {
            title : this.props.title || '',
            project : this.props.project || ''
        }
     }
     changeValue = (e) => {
         let key = e.target.name;
         let action = {}
         action[key] = e.target.value
         this.setState(action)
     } 
    render() {
        let textContent = this.state.title ? "Update" : "Create";
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="ui form">
                        <div className="field">
                            <label>Title</label>
                            <input type="text" name="title" value={this.state.title} onChange={this.changeValue} />
                        </div>
                        <div className="field">
                            <label>Project</label>
                            <input type="text" name="project" value={this.state.project} onChange={this.changeValue}/>
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
            isOpen: false
        }
    }
    handleFormOpen = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm />
            )
        } else {
            return (
                <div className="ui basic content center aligned segment">
                    <button className="ui basic button icon" onClick={(e) => this.handleFormOpen()}>
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