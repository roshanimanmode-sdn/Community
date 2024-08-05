// Function to get the token from localStorage
export const getInfo =()=>{
    let user = localStorage.getItem('token');
    return user;
}