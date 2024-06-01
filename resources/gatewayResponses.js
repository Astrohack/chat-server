const Actions = {
    ERROR: 0,
    IDENTIFY: 1,
    READY: 2,
}


class BasicResponse {
    constructor(action, data){
        this.ac = action
        this.data = data
    }
}

class Identify extends BasicResponse {
    constructor(data){
        super(Actions.IDENTIFY, data)
    }
}

class Ready extends BasicResponse {
    constructor(data){
        super(Actions.READY, data)
    }
}

class Error extends BasicResponse {
    constructor(data){
        super(Actions.ERROR, data)
    }
}


module.exports = {
    Identify,
    Ready,
    Error,
}