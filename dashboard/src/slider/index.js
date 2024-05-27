const getSliders = async ()=>{
    const token = localStorage.getItem("adminToken");
    const {data} = await axios.get("https://yalla-lyyy.onrender.com/slider/getSliders",{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    return data;
};
const displaySliders = async()=>{
    const data = await getSliders();
    console.log(data)
    const sliders = data.sliders
    const result =sliders.map((slider)=>
        `
        <tr>
            <td><img src ="${slider.image.secure_url}" width = "50px"/></td>
            <td>${slider.link}</td>
            <td>${slider.status}</td>
            <td>edit</td>
        </tr>
        `
    ).join('');
    document.querySelector(".data").innerHTML = result;
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