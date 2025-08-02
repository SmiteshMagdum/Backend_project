class ApiError extends Error {
    constructor(
        statusCOde,
        message= "Something went wrong",
        errors = [],
        statck  = ""

    ){
        super(message)
        this.statusCode = this.statusCode
        this.data = null 
        this.message = message
        this.sucess = false
        this.errors =  errors


        if(statck){
            this,stack = statck
        }else{
            Error.captureStackTrace(this, this.
                constructor)
        }
    }
}

export {ApiError}