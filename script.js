


function convertStringToArray(string){
    var temp = string.split(",");
    for(var i = 0; i < temp.length; i++){
        temp[i] = parseInt(temp[i]);
    }
    return temp;
}
function avg(array){
    var temp = 0;
    var count = 0;
    for(var i = 0; i < array.length; i++){
        temp += array[i];
       count++;
    }
    return (temp  / count);

}





function checkWeight(array){
    var sum = 0;
    for(var i = 0; i < array.length; i++){
        sum+= array[i];
    }
    return (sum === 1);
}



function calculate(condition){
    var hw = avg(convertStringToArray(document.getElementById("hw").value));
    var qz = avg(convertStringToArray(document.getElementById("qz").value));
    var tst = avg(convertStringToArray(document.getElementById("tst").value));
    var fnl = avg(convertStringToArray(document.getElementById("fnl").value));

    var hw_wgt = (parseInt(document.getElementById("hw_wgt").value)) / 100;
    var qz_wgt = (parseInt(document.getElementById("qz_wgt").value)) / 100;
    var tst_wgt = (parseInt(document.getElementById("tst_wgt").value)) / 100;
    var fnl_wgt = (parseInt(document.getElementById("fnl_wgt").value)) / 100;
    var totalWeight = [hw_wgt,qz_wgt,tst_wgt,fnl_wgt];
    var total = (((hw * hw_wgt) + (qz * qz_wgt) + (tst * tst_wgt) + (fnl * fnl_wgt)));
    //find sum all weights-finalweight
    var totalWithoutFnl = ((hw * ((hw_wgt / (1 - fnl_wgt))) + (qz * (qz_wgt / (1 - fnl_wgt))) + (tst * (tst_wgt / (1 - fnl_wgt)))));
    var necesaryGrade = (((90 - totalWithoutFnl) / fnl_wgt));
    if(checkWeight(totalWeight) === true) {
        clearNotification();
        if (condition === 0) {
            returnNecessaryGrade(Math.round(necesaryGrade));
        }
        if (condition === 1) {
            if(fnl != NaN){
                returnGrade(Math.round(total));
            }else{
                error();
            }
        }
        if (condition === 2) {
            returnGrade(Math.round(totalWithoutFnl));
        }
    }else{
        error();
    }


}

//0 = need for a, 1 = current with final, 2 = current without final

function calculateNeedForA(){
    calculate(0);
}


function calculateCurrentWithFnl(){
    calculate(1);
}

function calculateCurrentWithoutFnl(){
    calculate(2);
}



function returnNecessaryGrade(x){
    document.getElementById("result").innerHTML = "You need at least a " + x + " on your final to receive an A in the class";
}

function returnGrade(x){
    document.getElementById("result").innerHTML = "You currently have a " + x + " in the class";
}

function clearNotification(){
    document.getElementById("notification").innerHTML = "";
}
function error(){
    document.getElementById("notification").innerHTML = "Hey dingus, your weight values dont add up to 100. <br> input new values and try again"
}