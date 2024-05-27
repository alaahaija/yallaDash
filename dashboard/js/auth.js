const loginForm = document.querySelector('#login');
loginForm?.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const elements = e.target.elements;
    const email = elements["email"].value;
    const password = elements["password"].value;
    const {data} = await axios.post(`https://yalla-lyyy.onrender.com/auth/login`,{
        email,
        password,
    });
    if (data.message == "success"){
        localStorage.setItem("adminToken",data.token);
        location.href="index.html";
    }
});
const checkAuth = async()=>{
    const token = localStorage.getItem("adminToken");
    if(!token){
        location.href = "./login.html";
    }else{
        const {users} = await getAuthUserData(token);
        console.log(users)
        document.querySelector(".userName").textContent = users.userName
    }
};
const getAuthUserData = async(token)=>{
    const {data} = await axios('https://yalla-lyyy.onrender.com/user/userWithToken',{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    console.log(data)
    return data
};
const logout = async()=>{
    localStorage.removeItem("adminToken");
    location.href="./../login.html";
}