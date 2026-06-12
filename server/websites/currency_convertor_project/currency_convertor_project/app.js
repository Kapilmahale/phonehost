const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/";

const dropdown = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdown){
    for(currcode in countryList)
    {
        let newoption =document.createElement("option");
        newoption.value = currcode;
        newoption.innerText = currcode;
        select.append(newoption);
        if(select.name==="from" && currcode === "USD"){
            newoption.selected = "selected";
        }

        if(select.name==="to" && currcode === "INR"){
            newoption.selected = "selected";
        }

        select.addEventListener("change", (evnt)=>{
            updateflag(event.target);
        })

    }
}

const updateflag= (element)=>{
   // console.log(element);
    let currcode=element.value;
    // console.log(currcode);
    let countrycode=countryList[currcode];
    let newsrc="https://flagsapi.com/${countrycode}/flat/64.png"
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}

btn.addEventListener("click", async (event)=>{
    event.preventDefault();
    let amount=document.querySelector(" .amount input");
    let amtval=amount.value;
    console.log(amount);
    //let from=dropdown[0].value;
    if(amtval=="" || amtval<1){
        amtval=1;
        amount.value="1";
    }

    console.log(fromcurr.value,tocurr.value);
    const url= `${base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}/${amtval}.json`;

    let response= await fetch(url);
    let data=await response.json();
    let rate=data[tocurr.value];
   // console.log(data)

   let finalamount= amtval*rate;
   msg.innerText=`${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
})



