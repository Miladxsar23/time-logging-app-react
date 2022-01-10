

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
            timerData: []
        }
    }
    handleLoadTimerFromServer = () => {
        client.getTimers().then(res => {
            this.setState({
                timerData : [...res]
            })
        }, failure => {
            console.log(failure)
        })
    }
    componentDidMount() {
        this.handleLoadTimerFromServer();
        setInterval(() => this.handleLoadTimerFromServer(), 5000)
    }
    createTimer = (timerAttr) => {
        let timer = helpers.newTimer(timerAttr)
        this.setState({
            timerData: [...this.state.timerData, timer]
        })
    }
    handleCreateFormSubmit = (timerAttr) => {
        this.createTimer(timerAttr)
    }
    editTimer = (timer) => {
        //update TimerData
        let newTimerData = this.state.timerData.map(timerItem => {
            if (timerItem.id === timer.id) return Object.assign({}, timerItem, timer)
            else return timerItem;
        })
        this.setState({
            timerData: newTimerData
        })
    }
    handleEditFormSubmit = (timer) => {
        this.editTimer(timer)
    }
    deleteForm = (timerID) => {
        let newTimerData = this.state.timerData.filter(timer => {
            return timer.id !== timerID
        })
        this.setState({
            timerData: [...newTimerData]
        })
    }

    handleDeleteForm = (timerID) => {
        this.deleteForm(timerID)
    }
    startClick = (timerID) => {
      const now = Date.now()
      this.setState({
          timerData : this.state.timerData.map(timer => {
              if(timer.id === timerID)
                return Object.assign({}, timer, {runningSince : now})
              else 
                return timer;  
          })
      })
    }
    stopClick = (timerID) => {
        const now = Date.now()
        this.setState({
            timerData : this.state.timerData.map(timer => {
                if(timer.id === timerID && timer.runningSince){
                    const newElapsed = timer.elapsed + (now - timer.runningSince)
                    return Object.assign({}, timer, {elapsed : newElapsed, runningSince : null})
                }else 
                    return timer;
            })
        })
    }
    handleStartClick = (timerID) => {
        this.startClick(timerID)
    }
    handleStopClick = (timerID) => {
        this.stopClick(timerID)
    }
    render() {
        const { timerData } = this.state
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList
                        onFormSubmit={this.handleEditFormSubmit}
                        onDeleteForm={this.handleDeleteForm}
                        timerData={timerData}
                        onStartTimer={this.handleStartClick}
                        onStopTimer={this.handleStopClick}
                    />
                    <ToggleableTimerForm
                        onFormSubmit={this.handleCreateFormSubmit}
                    />
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
                    onFormSubmit={this.props.onFormSubmit}
                    onDeleteForm={this.props.onDeleteForm}
                    onStartTimer={this.props.onStartTimer}
                    onStopTimer={this.props.onStopTimer}
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
    toggleForm = () => {
        this.setState({
            editForm: !this.state.editForm
        })
    }
    handleFormToggle = (e) => {
        this.toggleForm()
    }
    handleCloseForm = () => {
        this.toggleForm()
    }
    handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer)
        this.toggleForm()
    }
    render() {
        if (this.state.editForm) {
            return (
                <TimerForm
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    onFormSubmit={this.handleFormSubmit}
                    onFormClose={this.handleFormToggle}
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
                    onOpenForm={this.handleFormToggle}
                    onDeleteForm={this.props.onDeleteForm}
                    onStartTimer={this.props.onStartTimer}
                    onStopTimer={this.props.onStopTimer}
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
            title: this.props.title || '',
            project: this.props.project || ''
        }
    }
    changeValue = (e) => {
        let key = e.target.name;
        let action = {}
        action[key] = e.target.value
        this.setState(action)
    }
    handleSubmit = (e) => {
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.state.title,
            project: this.state.project
        })
    }
    render() {
        let textContent = this.props.id ? "Update" : "Create";
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
                            <input type="text" name="project" value={this.state.project} onChange={this.changeValue} />
                        </div>
                        <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic blue button" onClick={this.handleSubmit}>{textContent}</div>
                                <div className="ui basic red button" onClick={this.props.onFormClose}>Cancel</div>
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
    handleFormToggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer)
        this.handleFormToggle()
    }
    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm
                    onFormClose={this.handleFormToggle}
                    onFormSubmit={this.handleFormSubmit}
                />
            )
        } else {
            return (
                <div className="ui basic content center aligned segment">
                    <button className="ui basic button icon" onClick={this.handleFormToggle}>
                        <i className="plus icon"></i>
                    </button>
                </div>
            )
        }
    }
}
//Timer -> container + action
class Timer extends React.Component {
    handleDeleteForm = (e) => {
        this.props.onDeleteForm(this.props.id)
    }
    componentDidMount() {
        this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50)
    }

    componentWillUnmount() {
        clearInterval(this.forceUpdateInterval)
    }
    handleStartClick = () => {
        this.props.onStartTimer(this.props.id)
    }

    handleStopClick = () => {
        this.props.onStopTimer(this.props.id)
    }
    render() {
        const { title, project, elapsed, runingSince, onOpenForm } = this.props;
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
                        <span className="right floated edit icon cursor-pointer" onClick={onOpenForm}>
                            <i className="edit icon"></i>
                        </span>
                        <span className="right floated trash icon cursor-pointer" onClick={this.handleDeleteForm}>
                            <i className="trash icon"></i>
                        </span>
                    </div>
                </div>
                <TimerActionButton runingSince={!!runingSince} onStartTimer={this.handleStartClick} onStopTimer={this.handleStopClick} />
            </div>
        )
    }
}
class TimerActionButton extends React.Component {
    render() {
        if (this.props.runingSince) {
            return (
                <div className="ui bottom attached red basic button" type="button" onClick={this.props.onStopTimer}>Stop</div>
            )
        } else {
            return (
                <div className="ui bottom attached green basic button" type="button" onClick={this.props.onStartTimer}>Start</div>
            )
        }
    }
}

ReactDOM.render(<App />, document.querySelector("#root"))