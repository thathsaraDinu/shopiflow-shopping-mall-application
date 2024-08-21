import axios from "axios";

export const addpromotion = async(data) =>{
    const {data: response} = await axios.post(
        'http://localhost:3000/api/addpromotion',
        data,

    );
    return response;
    

}