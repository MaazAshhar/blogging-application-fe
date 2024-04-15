import { privateAxios } from "./helper";


export const loadAllCategories = async () =>{

    const resp=await privateAxios.get('categories/');
    return resp;
}