const responseData = (success: Boolean, statusCode: Number, message: String, data: {}) => {
    return {
        "success": success,
        "statusCode": statusCode,
        "message": message,
        "data": data
    }
}

export default responseData;