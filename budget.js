const balance = document.querySelector(".balance h1");
const Income = document.querySelector('.Income a');
const Outcome = document.querySelector('.Outcome a');

 // table
 const ExpensesTh = document.querySelector('.thead .Expenses');
 const IncomeTh = document.querySelector('.thead .Income');
 const All = document.querySelector('.All');
// element
const outcomeList = document.querySelector('.outcome-list');
const incomeList = document.querySelector('.income-list');
const allList = document.querySelector('.all-list');
//inputs Income
const inputs = document.querySelector('.inputs')
const Incometitle = document.getElementById('income-Title');
const Incomeprice = document.getElementById('income-price');
const addIncome = document.getElementById('add-income');
//inputs Outcome
const Outcometitle = document.getElementById('outcome-Title');
const Outcomeprice = document.getElementById('outcome-price');
const addOutcome = document.getElementById('add-outcome');
// list 
const listIncome = document.querySelector(".income-list .list");
const listOutcome = document.querySelector(".outcome-list .list");
const listAll = document.querySelector('.all-list .list')
 // btn
 const btnRemove = document.querySelector('.remove');
 const btnEdit = document.querySelector('.edit');

// create a variable
let array = [] ; let Balance = 0 ; let income = 0 ; let outcome = 0 ;
let DELETE = "remove" ;
let EDIT = "edit" ;
 // addEventListener

 IncomeTh.addEventListener('click' , () => {
    show(incomeList);
    active(IncomeTh);
    hide([outcomeList , allList]);
    inactive([ExpensesTh , All])
 })
ExpensesTh.addEventListener('click' , () => {
    show(outcomeList);
    active(ExpensesTh);
    hide([incomeList , allList]);
    inactive([IncomeTh , All]);
 })
 All.addEventListener('click' , () => {
    show(allList);
    active(All);
    hide([outcomeList , incomeList]);
    inactive([ExpensesTh , IncomeTh]);
 })

 listIncome.addEventListener("click" , editOrDelete);
 listOutcome.addEventListener("click" , editOrDelete);
 listAll.addEventListener("click" , editOrDelete);

 // edit or delete
 function editOrDelete(event){
    const btnTarget = event.target ;
    const entry = btnTarget.parentNode ;
    if(btnTarget.classList == DELETE){
        Delete(entry) 
    } else if(btnTarget.classList == EDIT){
        Edit(entry)
    }
 }
// Delete 
function Delete(entry){
    array.splice(entry.id , 1);
    update() ;
}
//Edit
function Edit(entry){
    let ENTRY = array[entry.id]
    if(ENTRY.type == "income"){
        Incometitle.value = ENTRY.title;
        Incomeprice.value = ENTRY.price;
    }
    else if(ENTRY.type == "outcome"){
        Outcometitle.value = ENTRY.title;
        Outcomeprice.value = ENTRY.price;
    }
    Delete(entry);
}

addIncome.addEventListener("click" , () => {
    if(!Incometitle.value || !Incomeprice.value) return ;

    const objIncome = {
        type : "income" , 
        title : Incometitle.value,
        price : parseInt(Incomeprice.value),
    }

    array.push(objIncome);
    deleteDataInput(Incometitle , Incomeprice) ;
    update() 
}) 
addOutcome.addEventListener("click" , () => {
    if(!Outcometitle.value || !Outcomeprice.value) return ;

    const objOutcome = {
        type : "outcome" , 
        title : Outcometitle.value,
        price : parseInt(Outcomeprice.value),
    }
    array.push(objOutcome);
    deleteDataInput(Outcometitle , Outcomeprice) ;
    update() 
}) 
function update(){
    income = calculate('income' , array);
    outcome =  calculate('outcome' , array) ;
    Balance = Math.abs(total(income , outcome)) ;
    
    let asign = (income >= outcome) ? '$' : '-$' ;

    balance.innerHTML = `<span>${asign}</span>${Balance}` ;
    Income.innerHTML = `<span>$</span>${income}` ;
    Outcome.innerHTML = `<span>$</span>${outcome}` ;

    clearElement([listIncome , listOutcome , listAll]);

    array.forEach((element , index) => {
        if(element.type === "income"){
            showData(element.price , element.title , index , listIncome , element.type)
        }
        else if(element.type === "outcome"){
            showData(element.price , element.title , index , listOutcome , element.type)
        }
       
    
    })
   

}

function showData(price , title , id , list , type) {
    const entryList = `
    <li id = "${id}" class="${type}">
        <a href="#">
            ${title}: ${price}
        </a>
    </li>
    <li>
        <a href="#">
            <img src="icon/edit.png" class="edit">
            <img src="icon/trash.png" class="remove">
        </a>
    </li>
    `
    let position = "afterbegin" ;
    list.insertAdjacentHTML(position , entryList)
}

function clearElement(elements){
    elements.forEach(items => {
        items.innerHTML = '' ;
    })
}
function calculate(type , arr){
    let total = 0;
    arr.forEach(item => {
        if(item.type === type){
            total += item.price
        }
    })
    return total
}

function total(el1 , el2){
   return el1 - el2 ;
}
function deleteDataInput(input1 , input2){
    input1.value = ""; 
    input2.value = ""; 
}

function show(el){
    el.classList.remove('hide');
}

 function active(el){
    el.classList.add("active");
 }
function hide(elements){
    elements.forEach(element => {
        element.classList.add("hide")
    });
}
function inactive(elements){
    elements.forEach(element => {
        element.classList.remove("active")
    });
}





