$(document).ready(()=>{
    const pathname = window.location.pathname;
    const idInter = pathname.split('/')[pathname.split('/').length-1];
    $.ajax({
        url: `/lists-infor`,
        type: "Get",
        success : data =>{
            $("#name-edit").val(data[idInter].name);
            $("#phone-edit").val(data[idInter].phoneNumber);
            // document.getElementById("submit").action=`/edit/${idInter}`;
        }
    });
});
