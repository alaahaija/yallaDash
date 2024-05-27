const getCoupons = async ()=>{
    const token = localStorage.getItem("adminToken");
    const {data} = await axios.get("https://yalla-lyyy.onrender.com/coupon/getAll",{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    return data;
};
const displayCoupons = async()=>{
    const data = await getCoupons();
    const coupons = data.coupons;
    const result =coupons.map((coupon)=>
        `
        <tr>
            <td>${coupon.name}</td>
            <td>${coupon.amount}</td>
            <td>${coupon.expireDate}</td>
        </tr>
        `
    ).join('');
    document.querySelector(".data").innerHTML = result;
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
};
const FormCreateCoupon = document.querySelector("#FormCreateCoupon");
FormCreateCoupon?.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const elements = e.target.elements;
    const name = elements['name'].value;
    const expireDate = elements['expireDate'].value;
    const amount = elements['amount'].value;
    const {data} = await axios.post("https://yalla-lyyy.onrender.com/coupon/create"
    ,{name,expireDate,amount},
    {
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    if(data.message == "success"){
        location.href="./index.html"
    }
})