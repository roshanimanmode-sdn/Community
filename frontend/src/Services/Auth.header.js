export const getInfo =()=>{
    let user = localStorage.getItem('token');
    user=(JSON.parse(user));
    return user;
}