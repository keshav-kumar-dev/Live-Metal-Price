let metalDiv= document.getElementById("metalDiv")

const getMetalData  = async()=>{
    const data = await fetch("http://localhost:3000/");
    const metalInfo = await data.json()
    // document.getElementsByClassName("info")[0].innerText= metalInfo;

    // console.log(Object.entries(metalInfo.metals))
    metalDiv.innerHTML = ""
    Object.entries(metalInfo.metals).map(ele=>{
        const metal = document.createElement("div");
        metal.className = "metal"
        metal.innerHTML =`
        <h2>${ele[0]}</h2>
        <p> ${ele[1]}</p>
        `
        metalDiv.appendChild(metal);

    })
}

setInterval(getMetalData,1000)