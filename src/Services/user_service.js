import { myAxios } from "./helper";

export const registerUser = async (data)=>{
    const res = await myAxios.post("v1/auth/signup",data);
    return res;
}

export const loginUser = async (values)=>{
    const loginDetails={
        username:values.email,
        password:values.password,
    }
    const res =  await myAxios.post("v1/auth/login",loginDetails);
    return res;
}