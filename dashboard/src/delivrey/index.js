const getDelivery = async()=>{
    const token = localStorage.getItem("adminToken");
    const {data} = await axios.get("https://yalla-lyyy.onrender.com/delivery/get",{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    return data;
};
const DisplayDataToForm = async(e)=>{
    const {delivery} = await getDelivery();
    console.log(delivery)
    document.getElementById("price").value = delivery.price;
    document.getElementById("discount").value = delivery.discount;};
    const displayDelivery = async()=>{
    const data = await getDelivery();
    const delivery = data.delivery;
    document.querySelector(".data").innerHTML =
    `
    <tr>
    <td>${delivery.price} NIS</td>
    <td>${delivery.discount} %</td>
    <td>${delivery.finalPrice} NIS</td>
    <td>
    <a href="./edit.html" data-toggle="tooltip" data-placement="top" title="Edit">
    <i class="far fa-edit"></i>
    </a>
    </td>
    </tr>
    `;
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
};
const FormUpdateDelivery = document.querySelector("#FormUpdateDelivery");
FormUpdateDelivery?.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const elements = e.target.elements;
    const price = elements["price"].value;
    const discount = elements["discount"].value;
    const {data} = await axios.put(`https://yalla-lyyy.onrender.com/delivery/update`,{
        price,discount
    },{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    if(data.message == "success"){
        location.href="./index.html"
    }
});