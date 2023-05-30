// DOM element(s) references
// const topUpRadio = document.querySelector(".topup:checked"); // *my top-up options
const unitsAvailableElem = document.querySelector(".unitsAvailable") ;
const totalUnitsBoughtElem = document.querySelector(".totalUnits") ;
const totalAmountSpentElem = document.querySelector(".totalAmount") ;
const advanceTakenElem = document.querySelector(".advanceTaken") ;


const topupNowBtn = document.querySelector(".topupNow");
const useNowBtn = document.querySelector(".useNow");


// *************** local storage ************************
let availUnits = 0;
let unitsTotal = 0;
let amountTotal = 0 ;
let advanceAmount = 0


if(localStorage["availUnits"]){
    availUnits =  Number(localStorage["availUnits"])  ;
}
if(localStorage["unitsTotal"]){
    unitsTotal = Number(localStorage["unitsTotal"])  ;
}
if(localStorage["amountTotal"]){
    amountTotal = Number(localStorage["amountTotal"])  ;
}

if(localStorage["advanceAmount"]){
    advanceAmount = Number(localStorage["advanceAmount"])  ;
}

//  ********************************************


// Factory Function instance 
const electricity =  Electricity(availUnits, unitsTotal, amountTotal, advanceAmount);


unitsAvailableElem.innerHTML = electricity.getUnitsAvailable() ;
totalUnitsBoughtElem.innerHTML = electricity.totalUnitsBought() ;
totalAmountSpentElem.innerHTML = electricity.totalAmountSpent() ;

// if advance money is not payed, show the green tick
if(electricity.advanceTaken()){
    advanceTakenElem.classList.remove("hidden")
}

// The function for displaying the info
function displayInfo(){
    unitsAvailableElem.innerHTML = electricity.getUnitsAvailable() ;
    totalUnitsBoughtElem.innerHTML = electricity.totalUnitsBought() ;
    totalAmountSpentElem.innerHTML = electricity.totalAmountSpent() ;

    // IF THERE IS ADVANCED TAKEN THEN I SHOULD SHOW THE ADVANCED GREEN TICK

    if(electricity.advanceTaken()){
        advanceTakenElem.classList.remove("hidden")
    }else{
        advanceTakenElem.classList.add("hidden")
    }

    // Pushing my totals to local storage
    localStorage["availUnits"] = JSON.parse(electricity.getUnitsAvailable())  ;
    localStorage["unitsTotal"] = electricity.totalUnitsBought() ;
    localStorage["amountTotal"] = electricity.totalAmountSpent() ;

    localStorage["advanceAmount"] = electricity.totalAdvancedAmount() ;

}

// ************************* Error messages elements *************************************
const debtError = document.querySelector("#advance-debt");
const notEnoughUnitsError = document.querySelector("#enough-units-error");
const usageOptionError = document.querySelector("#usage-option");
const topupOptionError = document.querySelector("#topup-option");


// function for when the top up button is triggered
function topupBtnClicked(){
    const topUpRadio = document.querySelector(".topup:checked") ; // * my top-up options
    if(topUpRadio){
        if(topUpRadio.value != "advance"){
            electricity.topUpElectricity(Number(topUpRadio.value)) ;
        }else{
            if( electricity.advanceTaken() ){
                debtError.style.display = "block"
                setTimeout(function(){
                    debtError.style.display = "none"
                }, 4000)
            }
            electricity.topUpElectricity(topUpRadio.value) ;
 
        }
 
    }else{
        topupOptionError.style.display = "block"
        setTimeout(function(){
            topupOptionError.style.display = "none"
        }, 4000)
    }

    displayInfo()
}


//  function for when th usage button is clicked
function useNowBtnClicked(){
    const usageRadio = document.querySelector(".usage:checked"); // * my use appliances options
    if(usageRadio){
        if( electricity.useAppliance(usageRadio.value) == true){
            electricity.useAppliance(usageRadio.value) ;
        }else{
            notEnoughUnitsError.style.display = "block"
            setTimeout(function(){
                notEnoughUnitsError.style.display = "none"
            }, 4000)
        }
    }else{
        usageOptionError.style.display = "block"
        setTimeout(function(){
            usageOptionError.style.display = "none"
        }, 4000)
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
