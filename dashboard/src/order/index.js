const getStackholderOrder = async ()=>{
    const token = localStorage.getItem("adminToken");
    const {data} = await axios.get(`https://yalla-lyyy.onrender.com/order/stackholder/all`,{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    return data;
};
const displayStackholderOrder = async()=>{
    const data = await getStackholderOrder();
    const orders = data.order;
    console.log(data)
    const result =orders.map((order)=>
        `
        <tr>
            <td>${order.userId.userName}</td>
            <td>${order.createdAt}</td>
            <td>${order.finalOrderPrice}</td>
            <td>${order.phone}</td>
            <td>${order.address}</td>
            <td>${order.status}</td>
            <td> 
            ${order.status == 'pending'?
            `<button class="btn btn-success" onClick="changeStatus('${order._id}','confirmed')"> <i class="fas fa-plus"></i> </button>`
            :`<button class="btn btn-info" onClick="changeStatus('${order._id}','onWay')"> <i class="fas fa-bicycle"></i> </button>`}


            <button class="btn btn-danger" onClick="changeStatus('${order._id}','cancelled')"> <i class="fas fa-minus"></i> </button>


            </td>
        </tr>
        `
    ).join('');
    document.querySelector(".data").innerHTML = result;
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
};
const changeStatus = async(orderId,status)=>{
    const token = localStorage.getItem("adminToken");
    if(status == "onWay"){
        location.href=`./delivery.html?orderId=${orderId}`
    }
    console.log(status)
    const {data} = await axios.patch(`https://yalla-lyyy.onrender.com/order/changeStatus/${orderId}`,{status},{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    if(data.message == "success"){
        location.reload()
    }
};
const getDelivery = async()=>{
    const token = localStorage.getItem("adminToken");
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get("orderId");
    const {data} = await axios.get(`https://yalla-lyyy.onrender.com/user/getDelivery/${orderId}`
    ,
    {
        headers:{
            authorization:`YALLADEL__${token}`
        }
    }    
    );
    const result = data.delivery.map((element)=>
        `<option value=${element._id}>${element.userName}</option>`
    ).join('');
    document.querySelector(".delivery-js").innerHTML=result
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
const FormAssignToDelivery = document.querySelector("#FormAssignToDelivery");
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
FormAssignToDelivery?.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get("orderId");
    const elements = e.target.elements;
    const deliveryId = elements['deliveryId'].value
    const {data} = await axios.patch(`https://yalla-lyyy.onrender.com/order/changeStatus/${orderId}`,{
        status:'onWay',
        deliveryId:deliveryId
    },{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    console.log(data) 
})