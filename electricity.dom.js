// DOM element(s) references
// const topUpRadio = document.querySelector(".topup:checked"); // *my top-up options
const unitsAvailableElem = document.querySelector(".unitsAvailable") ;
const totalUnitsBoughtElem = document.querySelector(".totalUnits") ;
const totalAmountSpentElem = document.querySelector(".totalAmount") ;
const advanceTakenElem = document.querySelector(".advanceTaken") ;


const topupNowBtn = document.querySelector(".topupNow");
const useNowBtn = document.querySelector(".useNow");

// Factory Function instance 
const electricity =  Electricity();


function displayInfo(){
    unitsAvailableElem.innerHTML = electricity.getUnitsAvailable() ;
    totalUnitsBoughtElem.innerHTML = electricity.totalUnitsBought() ;
    totalAmountSpentElem.innerHTML = electricity.totalAmountSpent() ;

    // IF THERE IS ADVANCED TAKEN THEN I SHOULD SHOW THE ADVANCED GREEN TICK

    if(electricity.advanceTaken()){
        advanceTakenElem.classList.remove("hidden")
    }
}


function topupBtnClicked(){
    const topUpRadio = document.querySelector(".topup:checked"); // * my top-up options
    if(topUpRadio.value){
        if(topUpRadio.value != "advance"){
            electricity.topUpElectricity(Number(topUpRadio.value)) ;
        }else{
            electricity.topUpElectricity(topUpRadio.value) ;
        }
 
    }else{
        alert("top up option blank")
    }

    displayInfo()
}


function useNowBtnClicked(){
    const usageRadio = document.querySelector(".usage:checked"); // * my use appliances options
    if(usageRadio.value){
        electricity.useAppliance(usageRadio.value) ;
    }else{
        alert("select usage option")
    }

    displayInfo()
}


// DOM events here 
topupNowBtn.addEventListener("click", function(){
    topupBtnClicked()
})

useNowBtn.addEventListener("click",function(){
    useNowBtnClicked()
})
