(()=>{"use strict";var t=function(){function t(t){this.key=t}return t.prototype.getData=function(){return null!=localStorage.getItem(this.key)?JSON.parse(localStorage.getItem(this.key)):[]},t.prototype.setData=function(t){localStorage.setItem(this.key,JSON.stringify(t))},t}();new(function(){function e(){this.storageClass=new t("todo"),this.arrTodos=this.storageClass.getData(),this.listInput=document.querySelector(".list__input"),this.addTaskBtn=document.querySelector(".list__btn-add"),this.editTaskBtn=document.querySelector(".list__btn-edit-task"),this.todoTable=document.querySelector(".list__table"),this.onInit()}return e.prototype.onInit=function(){this.editTaskBtn.addEventListener("click",this.confirmEditTask.bind(this)),this.addTaskBtn.addEventListener("click",this.addTask.bind(this)),this.changeButtonsVisibility(this.editTaskBtn,this.addTaskBtn),this.renderTask(this.arrTodos),this.addStyleOnChecked()},e.prototype.renderTask=function(t){var e=this;this.todoTable.innerHTML="",t.map(function(t,i){e.todoTable.appendChild(e.generateTemplate(t.id));var n=document.querySelectorAll(".list__task-status"),s=e.generateCheckbox(t),a=e.generateLabel(t);n[i].append(s,a),s.addEventListener("change",e.updateCheckedStatus.bind(e,t.id))})},e.prototype.generateTemplate=function(t){var e=document.createElement("li"),i=document.createElement("button"),n=document.createElement("button"),s=document.createElement("div"),a=document.createElement("div");return e.classList.add("list__task"),s.classList.add("list__buttons"),n.classList.add("list__btn-edit"),i.classList.add("list__btn-delete"),a.classList.add("list__task-status"),n.innerHTML="<img src='./assets/images/edit.png' class='img__edit' width='20' height='20' alt=''>",i.innerHTML="<img src='./assets/images/delete.png' class='img__delete' width='20' height='20' alt=''>",s.append(i,n),e.append(a,s),s.addEventListener("click",this.addEditButtonHandler.bind(this,t)),e},e.prototype.generateCheckbox=function(t){var e=document.createElement("input");return e.type="checkbox",e.id="item_".concat(t.id),e.checked=!!t.checked,e},e.prototype.generateLabel=function(t){var e=document.createElement("label");return e.setAttribute("for","item_".concat(t.id)),e.className="list__label",e.innerHTML=t.text,e},e.prototype.createRandomKey=function(){for(var t="",e="abcdefghijklmnopqrstuvwxyz",i=0;i<10;i++)t+=e.charAt(Math.floor(Math.random()*e.length));return t},e.prototype.updateTodos=function(){this.storageClass.setData(this.arrTodos),this.renderTask(this.arrTodos)},e.prototype.addTask=function(t){if(t.preventDefault(),this.listInput.value){var e={text:this.listInput.value,checked:!1,id:this.createRandomKey()};this.arrTodos.unshift(e),this.updateTodos(),this.listInput.value=""}},e.prototype.deleteTask=function(t){var e=this.arrTodos.findIndex(function(e){return e.id===t});this.arrTodos.splice(e,1),this.updateTodos()},e.prototype.editTask=function(t){var e=this.arrTodos.find(function(e){return e.id===t});this.listInput.value=e.text,this.changeButtonsVisibility(this.addTaskBtn,this.editTaskBtn),this.editedElem=e},e.prototype.confirmEditTask=function(t){t.preventDefault(),this.editedElem.text=this.listInput.value,this.updateTodos(),this.changeButtonsVisibility(this.editTaskBtn,this.addTaskBtn),this.listInput.value=""},e.prototype.addEditButtonHandler=function(t,e){var i=e.target;"list__btn-edit"===i.className&&(this.setStateEditButtons(!0),this.editTask(t)),"list__btn-delete"===i.className&&this.deleteTask(t)},e.prototype.setStateEditButtons=function(t){document.querySelectorAll(".list__btn-edit").forEach(function(e){return e.disabled=t})},e.prototype.changeButtonsVisibility=function(t,e){t.style.display="none",e.style.display="block"},e.prototype.updateCheckedStatus=function(t){var e=this.arrTodos.find(function(e){return e.id===t});e.checked=!e.checked,this.arrTodos.sort(function(t,e){return t.checked-e.checked}),this.updateTodos(),this.addStyleOnChecked()},e.prototype.addStyleOnChecked=function(){var t=this;document.querySelectorAll('input[type="checkbox"]:checked').forEach(function(e){var i=e.id.replace("item_",""),n=document.querySelector('label[for="item_'.concat(i,'"]')),s=t.arrTodos.find(function(t){return t.id===i});return n.style.textDecoration=s.checked?"line-through":"none"})},e}())})();