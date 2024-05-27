/*const getRestaurant = async ()=>{
    const token = localStorage.getItem("adminToken");
    const {data} = await axios.get("https://yalla-lyyy.onrender.com/restaurent/getall",{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    return data;
};
const displayRestaurant = async()=>{
    const data = await getRestaurant();
    const restaurent = data.restaurent;
    const result =restaurent.map((restaurent)=>
        `
        <tr>
            <td><img src ="${restaurent.logo.secure_url}" width = "50px"/></td>
            <td>${restaurent.name}</td>
            <td>${restaurent.phone}</td>
            <td>${restaurent.address}</td>
            <td>${restaurent.status}</td>
            <td>
            <a href="#" class="btn btn-primary">
            <i class="fas fa-plus"></i>
            </a>
            </td>
        </tr>
        `
    ).join('');
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
const getCategories = async ()=>{
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
    return categories;
};
const displayCategories = async()=>{
    const categories = await getCategories();
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const result = categories.map((category)=>
        `
        <tr>
        <td>${category.name}</td>
        <td>
        <img src="${category.image.secure_url}" width="50px"/>
        </td>
        </tr>
        `
    ).join('');
    document.querySelector(".data").innerHTML=result;
    document.querySelector(".link-js").setAttribute('href',`./create.html?id=${id}`)
};
const FormCreateCategories = document.querySelector("#FormCreateCategories");
FormCreateCategories?.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const searchParams = new URLSearchParams(window.location.search);
    const restId = searchParams.get("id");
    const elements = e.target.elements;
    const formData = new FormData();
    formData.append("name",elements["name"].value);
    formData.append("image",elements["image"].files[0]);
    formData.append("restaurentId",restId);

    const {data} = await axios.post(`https://yalla-lyyy.onrender.com/category/create/${restId}`
    ,formData,
    {
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    if(data.message == "success"){
        location.href=`./index.html?id=${restId}`
    }   
});