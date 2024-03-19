fetch("product.json")
.then(function(response){
    return response.json();
})

.then(function(product) {
    let placeholder = document.querySelector("#data-output");
    let out="";
    for(let product of product){
        out += `
        <tr>
                <td>${product.price} </td>
        </tr>
        `
    }
    
    placeholder.innerHTML=out;
})