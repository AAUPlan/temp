"use strict";



import { cases, panBalticCases } from "./public/js/data/cases";

import { createMap, addLayerToMap } from "./public/js/map";

const token = localStorage.getItem("auth-token");
const localSelection = document.querySelector("#selectableContent");
const panSelection = document.querySelector("#selectableContentPan");
panSelection.style.display = "none";

createMap();
populateNavbar();

let generateCaseContent = function(obj, depth = 0, parent = "top"){
  // This rather convoluted recursive function iterates through the input data and populates the UI with accordions accordingly. With this approach, the input data can be of any depth. Consider the naming of the objects in the input, they should be  unique.

  const colors = ["waves-light", "red", "blue"];
  const identifier = obj.name.toLowerCase().replace(/ /g, "_");
  
  let htmlString = `<button id='${parent}-${identifier}-${depth}' class='${colors[depth]} btn accordion'>${obj.name}</button>`;
      htmlString += `<div class='content ${identifier} accordion-container level-${depth} '>`;
  
  if(obj.hasOwnProperty('sites')){
    depth += 1;
    obj.sites.map( site => {
      htmlString += generateCaseContent(site, depth, identifier);
      htmlString += "</div>";}   
    )
  }
  
  if(obj.hasOwnProperty('data')){
    obj.data.map( dataPoint  => {
      const dataID = `${parent}-${identifier}-${dataPoint.name}-layer`;
      const dataURL = dataPoint.url;
      htmlString += `<label class='switch'>
      <input type='checkbox' class='toggle' id='${dataID}' data-url='${dataURL}'/>
      <span class='slider'> ${identifier} </span>
     </label>`;
     
    })
    }
  return htmlString;
}

cases.map(caseSite => {
  localSelection.innerHTML += generateCaseContent(caseSite); 
});

panBalticCases.map(caseSite => {
  panSelection.innerHTML += generateCaseContent(caseSite); 
});


accordionFunctionality(); //add toggle and hide functionality to the cases
layerToggleFunctionality();

function accordionFunctionality() {
  const accordions = document.querySelectorAll(".accordion");

  for (let index = 0; index < accordions.length; index++) {
    accordions[index].addEventListener("click", event => {
      const target = `#${event.target.id}`;
      const content = document.querySelector(target).nextSibling; //Get the accordion content to toggle it below
   
      //If max height = 0 (closed), then open.
      if (content.style.maxHeight) {
        let parentContainerHeight = parseInt(content.parentElement.style.maxHeight.split("p")[0]); //The height of the element is returned as a string e.g. 100px. For this reason, the string is split at p, the first element, the number, is then parced as an integer.
        let childContainerHeight = parseInt(content.style.maxHeight.split("p")[0]);
  
        //If open, close it.
        content.style.maxHeight = null;
        content.style.overflow = "hidden";
        content.parentElement.style.maxHeight = parentContainerHeight - childContainerHeight + "px";

      } else {
        //If content has children, add the height of those to the scroll height.
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.overflow = "visible";
        if(content.parentElement.classList.contains("accordion-container")){
          let parentContainerHeight = parseInt(content.parentElement.style.maxHeight.split("p")[0]); //The height of the element is returned as a string e.g. 100px. For this reason, the string is split at p, the first element, the number, is then parced as an integer.
          let childContainerHeight = parseInt(content.style.maxHeight.split("p")[0]);
    
          content.parentElement.style.maxHeight = parentContainerHeight + childContainerHeight + 20 + "px";
        }
      }
    });
  }
}


function layerToggleFunctionality(){
  const toggles = document.querySelectorAll(".toggle");

  for (let index = 0; index < toggles.length; index++) {

    const dataID = toggles[index].id;
    const dataURL = toggles[index].getAttribute("data-url");

    if( dataURL !== "undefined")  return addLayerToMap(dataID, dataURL);
   
  }
  
}



function populateNavbar() {
  const navbar = document.querySelector("#nav-btns");

  // If the user has an authorized token in local storage, the UI will change
  if (!token) {
    const linkToLogin = document.createElement("a"); //TODO consider making these buttons for accesibility consistency½
    linkToLogin.href = "/login.html";
    linkToLogin.innerHTML = "Log in";
    linkToLogin.classList = "waves-effect waves-light btn";

    const linkToRegister = document.createElement("a"); //TODO consider making these buttons for accesibility consistency
    linkToRegister.href = "register.html";
    linkToRegister.innerHTML = "Register";
    linkToRegister.classList = "waves-effect waves-light btn";

    navbar.appendChild(linkToLogin);
    navbar.appendChild(linkToRegister);

  } else {
    const logoutBtn = document.createElement("BUTTON");
    logoutBtn.innerHTML = "Log out";
    logoutBtn.classList = "waves-effect waves-light btn";
    navbar.appendChild(logoutBtn);

    logoutBtn.addEventListener("click", event => {
      localStorage.removeItem("auth-token");
      window.open("/index.html", "_self"); //Reload the window to make the changes appear.
    });
  }
}



//THE FOLLOWING FUNCTIONS ARE CALLED onClick - SEE index.html

const toggleLocalCases = document.querySelector("#display-local-cases");
const togglePanBalticCases = document.querySelector(
  "#display-pan-baltic-cases"
);

toggleLocalCases.addEventListener("click", displayLocalCases);
togglePanBalticCases.addEventListener("click", displayPanBalticCases);

function displayLocalCases() {
  const ActiveUI = document.querySelector("#selectableContent");
  ActiveUI.style.display = "flex";
  const UI = document.querySelector("#selectableContentPan");
  DESTROYCONTENT(UI);
}

function displayPanBalticCases() {
  const ActiveUI = document.querySelector("#selectableContentPan");
  ActiveUI.style.display = "flex";
  const deactiveUI = document.querySelector("#selectableContent");
  DESTROYCONTENT(deactiveUI);
}

function DESTROYCONTENT(selection) {
  selection.style.display = "none";
}














