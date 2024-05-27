const getTypes = async ()=>{
    const token = localStorage.getItem("adminToken");
    const {data} = await axios.get("https://yalla-lyyy.onrender.com/type/getall",{
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    return data;
};
const getType = async()=>{
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    const {data} = await axios.get(`https://yalla-lyyy.onrender.com/type/getType/${id}`);
    const type = data.type;
    document.querySelector("#Name").value = type.name;
};
const displayTypes = async()=>{
    const data = await getTypes();
    const types = data.types;
    const result =types.map((type)=>
        `
        <tr>
            <td>${type.name}</td>
            <td>${type.status}</td>
            <td>
            <a href="./edit.html?id=${type._id}" class="btn btn-warning"  data-toggle="tooltip" data-placement="top" title="Edit">
            <i class="far fa-edit"></i>
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
const FormUpdateType = document.querySelector("#FormUpdateType");
FormUpdateType?.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const searchParams = new URLSearchParams(window.location.search);
    const typeId = searchParams.get("id");
    const elements = e.target.elements;
    const name = elements['Name'].value;
    const status = elements['status'].value;
    const {data} = await axios.patch(`https://yalla-lyyy.onrender.com/type/update/${typeId}`,{name,status},
    {
        headers:{
            authorization:`YALLADEL__${token}`
        }
    });
    if(data.message == "success"){
        location.href="./index.html"
    }
})