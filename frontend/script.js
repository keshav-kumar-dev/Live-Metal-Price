const socket = io("http://localhost:3000");
let metalInfo ;

const metalArr = ["gold", "silver", "platinum" , "palladium", "copper","aluminum","lead","nickel","zinc"];

socket.on('updatedMetalData', (res) => {

    metalInfo = JSON.parse(res);
    getMetalData();
});

let metalDiv = document.getElementById("metalDiv")

const getMetalData = async () => {

    metalDiv.innerHTML = "";
    // Object.entries(metalInfo.metals).map(ele => {
    //     if(metalArr.includes(ele[0])){

    //         const metal = document.createElement("div");
    //         metal.className = "metal"
    //         metal.innerHTML = `
    //         <h2>${ele[0]}</h2>
    //         <p> ${ele[1]}</p>
    //         `
    //         metalDiv.appendChild(metal);
    //     }

    // })
    
            const metal = document.createElement("div");
            metal.className = "metal"
            metal.innerHTML = `
            <h2>${metalInfo.code}</h2>
            <p> ${metalInfo.price}</p>
            `
            metalDiv.appendChild(metal);
        

    
}