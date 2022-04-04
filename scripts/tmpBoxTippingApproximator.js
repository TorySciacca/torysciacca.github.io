// Proprietary TMP software that roughly calcuates the amount of 3kg boxes needed for diffrent pre-packed products

// Main calcuation function (In kilograms)

function amountOfBoxesTipped(amountofTrays, punnetsPerTray, punnetWeight){
    return ((amountofTrays * punnetsPerTray) * punnetWeight) / 3
  };

// Establishes all the products and thier properties  

const costco650 = {
  punnetsPerTray: 6,
  punnetWeight: 0.65,
  value : "costco650"
}

const aldi500 = {
  punnetsPerTray: 6,
  punnetWeight: 0.5,
  value: "aldi500"
};

const aldi200 = {
    punnetsPerTray: 12,
    punnetWeight: 0.2,
    value: 'aldi200'
  };

const ww375 = {
  punnetsPerTray: 6,
  punnetWeight: 0.375,
  value: 'ww375'
};

const ww200 = {
  punnetsPerTray: 6,
  punnetWeight: 0.2,
  value: 'ww200'
}

const tmp500 = {
    punnetsPerTray: 6,
    punnetWeight: 0.5,
    value: "tmp500"
  };

const tmp200 = {
    punnetsPerTray: 12,
    punnetWeight: 0.2,
    value: 'tmp200'
  };

//Running the Script

function runScript() {

    // User input
    let product;
    if (document.getElementById("productSelect").value === costco650.value){
        product = costco650
    }
    else if (document.getElementById("productSelect").value === aldi500.value){
        product = aldi500
    }
    else if (document.getElementById("productSelect").value === aldi200.value){
        product = aldi200
    }
    else if (document.getElementById("productSelect").value === ww375.value){
        product = ww375
    }
    else if (document.getElementById("productSelect").value === ww200.value){
        product = ww200
    }
    else if (document.getElementById("productSelect").value === tmp500.value){
        product = tmp500
    }
    else if (document.getElementById("productSelect").value === tmp200.value){
        product = tmp200
    }
    else {console.log('An Error has occured')};

    let boxesRequired = parseInt(document.getElementById("traysRequired").value); //text field 

    // User output
    let finalCalculation = Math.round(amountOfBoxesTipped(boxesRequired,product.punnetsPerTray,product.punnetWeight));

    //Prints results and checks for errors. 
    if (typeof boxesRequired === 'number') {
        if(boxesRequired <= 0){
            document.getElementById("output").innerHTML = 'Error, please enter a number above 0'}
        else if(Number.isInteger(boxesRequired)){
            document.getElementById("output").innerHTML = `You would need to tip approximately ${finalCalculation} boxes of 3kg mushrooms`}
        else{
            document.getElementById("output").innerHTML = 'Error, please enter a number'}}
    else {
        document.getElementById("output").innerHTML = 'Error, please enter a number'};
}