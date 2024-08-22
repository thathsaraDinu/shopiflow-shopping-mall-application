import { instance } from "@/hooks/use-axios";
import axios from "axios";

export const addpromotion = async(data) =>{
    try {
        const { data: response } = await instance.post(
          'api/addpromotion',
          data,
        );
        return response;
    } catch (error) {
        console.error(
          'Error Creating Promotion',
          error,
        );
        throw error;
    }
    // return axios.post('api/addpromotion', data);
}