/*const getProducts = async ()=>{
    const token = localStorage.getItem("adminToken");
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const {data} = await axios.get(`https://yalla-lyyy.onrender.com/product/getAll/${id}`,{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    return data;
};

const  getRestCategories = async()=>{
    const token = localStorage.getItem("adminToken");
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const {data} = await axios.get("https://yalla-lyyy.onrender.com/category/all",{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    const allCategories = data.categories;
    const categories = allCategories.filter((category)=>{
        return category.restaurentId === id;
    })
    const result = categories.map((category)=>
    `
    <option value="${category._id}">${category.name}</option>
    `
    ).join('');
    document.querySelector(".category-js").innerHTML=result
};*/
const getUsers = async()=>{
    const token = localStorage.getItem("adminToken");
    const {data} = await axios.get(`https://yalla-lyyy.onrender.com/user/getUsers`,{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    console.log(data)
    return data;
};
const displayUsers = async()=>{
    const data = await getUsers();
    console.log(data)
    const users = data.users;
    const result =users.map((user)=>
        `
        <tr>
            <td>${user.userName}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.status}</td>
            <td>${user.role}</td>
        </tr>
        `
    ).join('');//
    
    document.querySelector(".data").innerHTML = result;
};
const getTypes = async ()=>{
    const token = localStorage.getItem("adminToken");
    const {data} = await axios.get("https://yalla-lyyy.onrender.com/type/active",{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    return data;
};
/*
const displayTypes = async()=>{
    const data = await getTypes();
    const types = data.types;
    const result =types.map((type)=>
        `
        <option value="${type._id}">${type.name}</option>
        `
    ).join('');
    document.querySelector(".dataType").innerHTML = result;
   
};
const getStackholder = async ()=>{
    const token = localStorage.getItem("adminToken");
    const {data} = await axios.get("https://yalla-lyyy.onrender.com/user/getStackholder",{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    return data;
};
const displayStackholder = async()=>{
    const data = await getStackholder();
    const Stackholders = data.getStackholder;
    const result =Stackholders.map((Stackholder)=>
        `
        <option value="${Stackholder._id}">${Stackholder.userName}</option>
        `
    ).join('');
    document.querySelector(".dataUser").innerHTML = result;
};*/
const FormCreateProduct = document.querySelector("#FormCreateProduct");
FormCreateProduct?.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const elements = e.target.elements;
    const formData = new FormData();
    formData.append("name",elements["name"].value);
    formData.append("price",elements["price"].value);
    formData.append("discount",elements["discount"].value);
    formData.append("description",elements["description"].value);
    formData.append("categoryId",elements["categoryId"].value);
    formData.append("image",elements["image"].files[0]);
    formData.append("restaurentId",id);
    const {data} = await axios.post("https://yalla-lyyy.onrender.com/product/create"
    ,formData,
    {
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    if(data.message == "success"){
        location.href=`./index.html?id=${id}`
    }
    
});
const FormCreateUser = document.querySelector("#FormCreateUser");
FormCreateUser?.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const elements = e.target.elements;
    const userName = elements['name'].value;
    const email = elements['email'].value;
    const password = elements['password'].value;
    const address = elements['address'].value;
    const phone = elements['phone'].value;
    const role = elements['role'].value;
    const {data} = await axios.post('https://yalla-lyyy.onrender.com/auth/register'
    ,{
        userName,
        email,
        password,
        address,
        phone,
        role,
    },{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    if(data.message == "success"){
        location.href=`./index.html`
    }
})