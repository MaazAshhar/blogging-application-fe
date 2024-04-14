// check user log in or not

export const isLoggedIn=()=>{
    const user=localStorage.getItem("user");
    if(user !=null)return true;
    else return false;
}


// save the details of logged in user

export const doLogin= async (res,next)=>{
    localStorage.setItem("token", JSON.stringify(res.data.token));
    localStorage.setItem('user', JSON.stringify(res.data.user));
    next();
}

// get the details of logged in user

export const getCurrentUserDetails = async ()=>{
    if(isLoggedIn){
        return JSON.parse(localStorage.getItem("user"));
    }
    else return JSON.parse("no user looged in");
}

//get token 

export const getToken =()=>{
    if(isLoggedIn){
        return JSON.parse(localStorage.getItem("token"));
    }
    else return JSON.parse("no user logged in");
}

// log out current user

export const doLogout = (next)=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    next();
}