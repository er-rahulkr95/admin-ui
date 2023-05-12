// function to handle Axios http error occured during fetching or posting data  via apiendpoint.
/**
 * 
 * @param {Object<error>} error  Axios error object -  occured during http request for getting the data from server via http Method (e.g. GET method) to apiEndpoint  
 * @returns {string}   message containing reason for error or error status text
 * 
 * Most Widely errors occured are listed below:
 * // http Response Error:
 * Due to client side error
 *      400: Bad Request 
 *      401: Unauthorized
 *      403: Forbidden
 *      404: Not Found
 *      408: Request Timeout
 * Due to server side error
 *      500: Internal Server Error
 *      502: Bad Gateway
 *      503: Service Unavailable
 *      504: Gateway Timeout
 * 
 * Note: Here switch case are used so that if in future any customised message is returned in response for different status, then we should get
 * it from response and return it. 
 */


const errorHandler = (error) =>{
    if(error.response && error.response?.status){
        switch(error.response.status){
            case 400 :  return error.response.statusText ;
                        
            case 401:    return error.response.statusText ;
                      
            case 403 :   return error.response.statusText ;
                    
            case 404 :    return error.response.statusText ;
                       
            case 408 :    return error.response.statusText ;
                      
            case 500 :     return error.response.statusText ;
                  
            case 502 :    return error.response.statusText ;
                       
            case 503 :   return error.response.statusText ;
                      
            case 504 :    return error.response.statusText ;
                        
            default :    return "Oops! Something Went Wrong Server Side" ;
                  
        }
    }else if(error.request){
        return `${error.request.statusText} : The request was made but no response was received` ;
    }else{
       return error.message ;

    }

}

export default errorHandler ;