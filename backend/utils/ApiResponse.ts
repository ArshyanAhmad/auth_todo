class ApiResponse {
    statusCode: number
    message: string
    data: any

    constructor(
        statusCode: number,
        message: string,
        data: any
    ) {
        this.statusCode = statusCode
        this.message = message
        this.data = data
    }
}

// type Obj = {
//     statusCode: number,
//     message: string,
//     data: any
// }

// class ApiResponse {
//     constructor(public response: Obj) { }
// }

export { ApiResponse };