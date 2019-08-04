window.onload = () =>{
    $.ajax({
        url: `/lists-infor`,
        type: "Get",
        success : data =>{
            data.forEach(element => {
                $("#tbody").append(`
                            <tr>
                                <td id="${element.id}-id">${element.id+1}</td>
                                <td id="${element.name}-name">${element.name}</td>
                                <td id="${element.phoneNumber}-phoneNumber">${element.phoneNumber}</td>
                                <td><form action="/edit/${element.id}" method="GET"><button>Sửa</button> <button formaction="/delete/${element.id}">Xoá</button></from></td>
                            </tr>
                        `);
              });   
            
        }
    });
    
}