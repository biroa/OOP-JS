function onReady(){
    var clock,date;
    //property variable in a function
    //method is function in a function
    date = new Date();
    console.log(date);
    //this is the element of the DOM (Document Object Model)
    clock = document.getElementById('clock');

    clock.innerHTML = date.getHours()+":"+ date.getDate() +":"+ date.getMinutes();
}

window.onload = onReady;