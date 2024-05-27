const getRestaurant = async ()=>{
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
            <a href="./categories/index.html?id=${restaurent._id}" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Category">
            <i class="fas fa-list"></i>
            </a>
            <a href="./../products/index.html?id=${restaurent._id}" class="btn btn-info" data-toggle="tooltip" data-placement="top" title="Add Product">
            <i class="fas fa-utensils"></i>
            </a>
            </td>
        </tr>
        `
    ).join('');
    document.querySelector(".data").innerHTML = result;
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
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
};
const FormCreateRestaurant = document.querySelector("#FormCreateRestaurant");
FormCreateRestaurant?.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const elements = e.target.elements;
    const formData = new FormData();
    formData.append("name",elements["name"].value);
    formData.append("slogan",elements["Slogan"].value);
    formData.append("address",elements["address"].value);
    formData.append("phone",elements["phone"].value);
    formData.append("description",elements["description"].value);
    formData.append("typeId",elements["typeId"].value);
    formData.append("userId",elements["userId"].value);
    formData.append("logo",elements["logo"].files[0]);

    const {data} = await axios.post("https://yalla-lyyy.onrender.com/restaurent/create"
    ,formData,
    {
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    if(data.message == "success"){
        location.href="./index.html"
    }
    
});