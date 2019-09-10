"use strict" 
let section = document.querySelector('.todoapp');
let input = section.querySelector('.new-todo');
let ul = section.querySelector('.todo-list');
let filters = section.querySelector('.filters');
let strong = section.querySelector('.todo-count strong');
  

input.addEventListener("keyup",({code, target})=>{ //обработка данных поля ввода 1
       
    if(!(code==="Enter")||(target.value==="")){
     return;
     }
    list(target);
    target.value=""; 
   strong.innerHTML = length([...ul.querySelectorAll('li')]); 
});

function list(target){// добавление ли блока 2
 ul.insertAdjacentHTML("afterbegin", `<li>
                <div class="view"><input class="toggle" type="checkbox"><label>${target.value}</label>
                    <button class="destroy"></button>
                </div>
            </li>`);
}

ul.addEventListener("click",({target})=>{//обработка событий ul блока 3
if(!(target.hasAttribute("type")||target.classList.contains("destroy"))) return;
let li = target.closest("li");
if(target.hasAttribute("type"))li.classList.toggle("completed");
if(target.classList.contains("destroy")) li.remove();
})
filters.addEventListener("click",({target})=>{ //активация фильтров 4
    if(!(target.classList.contains("all")||target.classList.contains("active")||target.classList.contains("completed"))){
        return;
    }
  let ulList = [...ul.querySelectorAll('li')];
 
  sort(ulList, target.getAttribute("class"))
    
 strong.innerHTML = length(ulList);

});
     
function sort(ulList, target){ //сортировка по фильтру 5
    switch(target){
        case 'all': 
            ulList.forEach(value=>{value.removeAttribute("hidden")})
            break;
        case 'active': 
             ulList.forEach(value=>{if(value.classList.contains("completed")){
             value.setAttribute("hidden","true");
             }else 
             value.removeAttribute("hidden")
              });
            break;
        case 'completed': 
            ulList.forEach(value=>{if(value.classList.contains("completed")){
             value.removeAttribute("hidden")
             }else 
             value.setAttribute("hidden","true");
              });
            break;
    }
}

function length(ulList){//подсчет выбраных элементов 6
let j =0;
    for(let i =0; i<ulList.length; i++){
   if(!ulList[i].hasAttribute("hidden")){
       j++;
       }
    }
    return j;
} 