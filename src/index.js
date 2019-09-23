"use strict";


//import { cases, panBalticCases } from "./public/js/data/cases";
import {fetchData} from "./public/js/data/fetchContent";
import { fetchpanData } from "./public/js/data/fetchPanContent"
import { fetchMetadata } from "./public/js/data/fetchMetaData"
import { createMap, addLayerToMap } from "./public/js/map";

const token = localStorage.getItem("auth-token");
const user =  localStorage.getItem("username");
const localSelection = document.querySelector("#selectableContent");
const panSelection = document.querySelector("#selectableContentPan");
panSelection.style.display = "none";


//fetchMetadata();
createMap();
populateNavbar();

let generateCaseContent = function(obj, depth = 0, parent = "top"){
  // This rather convoluted recursive function iterates through the input data and populates the UI with accordions accordingly. With this approach, the input data can be of any depth. Consider the naming of the objects in the input, they should be  unique.

  const colors = ["wave-effect waves-light", "orange darken-5", "cyan darken-1"]; //wave-effect, "red", "blue"
  const identifier = obj.name.toLowerCase().replace(/ /g, "_");
  
  let htmlString = `<li id='${parent}-${identifier}-${depth}' class='${colors[depth]} btn accordion'>${obj.name}</li>`;
      htmlString += `<div class='content ${identifier} accordion-container level-${depth} '>`;

 /* let htmlString = `<button id='${parent}-${identifier}-${depth}' class='${colors[depth]} btn accordion'>${obj.name}</button>`;
      htmlString += `<div class='content ${identifier} accordion-container level-${depth} '>`;*/
  
  if(obj.hasOwnProperty('sites')){
    depth += 1;
    obj.sites.map( site => {
      htmlString += generateCaseContent(site, depth, identifier);
      htmlString += "</div>";}   
    )
  }
  
  if(obj.hasOwnProperty('data')){
    htmlString += '<ul class="layerlist">' 
    obj.data.map( dataPoint  => {
      const dataID = `${parent}-${identifier}-${dataPoint.name.toLowerCase().replace(/ /g, "_")}-layer`;
      const dataURL = dataPoint.url;
      const downloadURL = dataPoint.durl;
      const downloadName = dataPoint.dname;
      const dataLayer = dataPoint.layer;
      htmlString += `<li class= 'layer'>
        <label class='checkLayer'>
          <input type='checkbox' class='toggle' id='${dataID}' data-url='${dataURL}' data-layer='${dataLayer}'/>
          <span> ${dataPoint.name} </span>
        </label>  
        <a class='download-button' role="button" name ='${dataLayer}' id='${dataID}' data-url='${dataURL}' layer='${dataLayer}'>Metadata</a>
        </li>`;
    })
    htmlString += '</ul>'
    }
    
  return htmlString;
}

//href='${downloadURL}' download='${downloadName}'
createHTML();
async function createHTML (){
  const casesServer = await fetchData(token);
    casesServer.map(caseSite => {
    localSelection.innerHTML += generateCaseContent(caseSite); 
  });
  const panBalticCasesServer = await fetchpanData(token);
  panBalticCasesServer.map(caseSite => {
    panSelection.innerHTML += generateCaseContent(caseSite); 
  });

    accordionFunctionality(); //add toggle and hide functionality to the cases
    layerToggleFunctionality();
    openWindowFunctionality();
}

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
    
          content.parentElement.style.maxHeight = parentContainerHeight + childContainerHeight + 10 + "px";
        }
      }
    });
  }
}

function openWindowFunctionality() {
    const btn = document.querySelectorAll(".download-button");
    const dialog = document.getElementById('metaDialog');
    const cancelBtn = document.getElementById('cancel');
  
    for (let downloadBtn = 0; downloadBtn < btn.length; downloadBtn++) {
        const btnElements = btn[downloadBtn];
        const btnName = btnElements['name'];
        const btnID = btnElements['id'];
        console.log(btnID);
        btnElements.addEventListener("click", event => {
            
            const metadata = fetchMetadata(token);
            Promise.resolve(metadata).then(function (values) {
                
                const elements = document.querySelectorAll(".header");
                
                values.forEach(function populateWindow(element) {
                    const metadataName = element.layer;
                    
                    if (metadataName === btnName) {

                        const metadataName = element.layer;
                        const metadataCaseName = element.case_name;
                        const metadataSiteName = element.site_name;
                        const metadataResource = element.resource;
                        const metadataURL = element.host_organisation;

                        const metadataStr = document.createElement('div'); //Create div element for metadata
                        let domString = '<div class="main_title"> ';
                        domString += `Information about the layer is included in the title</div ><div class="main_body"><div class="column_small"><div class="row">Case Name</div > 
                          <div class="row">Site Name</div>
                          <div class="row">Resource Type</div>
                          <div class="row">Host Organization</div>
                          <div class="row">URL</div></div >`;
                        domString += `<div class="column_large">
                          <div class="row">${metadataCaseName}</div>
                          <div class="row">${metadataSiteName}</div>
                          <div class="row">${metadataResource}</div>
                          <div class="row">${metadataResource}</div>
                          <div class="row">${metadataURL}</div>
                        </div></div>
                        `;
                        //<a class='cancel' role="button">Close</a>
                        metadataStr.innerHTML = domString;
                        dialog.appendChild(metadataStr);
                        dialog.showModal();
                    } /*else {
                        const metadataStr = document.createElement('div');
                        let domString = '<div class="main_title"> ';
                        domString += `Information about the layer is included in the title</div ><div class="main_body"> No metadata provided</div>`;
                        metadataStr.innerHTML = domString;
                        dialog.appendChild(metadataStr);
                    }*/
                    
                   

                    cancelBtn.addEventListener('click', event => {
                        dialog.close();
                    });
                    
                    });       
            });   
        }) 
    }
}

function layerToggleFunctionality(){
  const toggles = document.querySelectorAll(".toggle");
  
  toggles.forEach ((toggleButton)=> {
      
    const dataID = toggleButton.id;
    const dataURL = toggleButton.getAttribute("data-url"); 
    const dataName = toggleButton.getAttribute("data-layer");
    if( dataURL !== "undefined" && dataID !== "undefined" && dataName !== "undefined")  return addLayerToMap(dataID, dataURL, dataName);
   
  })
  
}

function populateNavbar() {
  const navbar = document.querySelector("#nav-btns");
  const greetingBox = document.querySelector (".greeting");
  const addDataBox = document.querySelector (".addDataBox");

  // If the user has an authorized token in local storage, the UI will change
  if (!token) {
    const linkToLogin = document.createElement("a"); //TODO consider making these buttons for accesibility consistency½
    linkToLogin.href = "/login.html";
    linkToLogin.innerHTML = "Log in";
    linkToLogin.classList = "waves-effect waves-light btn-small";

   /* const linkToRegister = document.createElement("a"); //TODO consider making these buttons for accesibility consistency
    linkToRegister.href = "register.html";
    linkToRegister.innerHTML = "Register";
    linkToRegister.classList = "waves-effect waves-light btn"; */

    navbar.appendChild(linkToLogin);
    //navbar.appendChild(linkToRegister);

  } else {
    const logoutBtn = document.createElement("BUTTON");
    logoutBtn.innerHTML = "Log out";
    logoutBtn.classList = "waves-effect waves-light btn-small";
    navbar.appendChild(logoutBtn);

    logoutBtn.addEventListener("click", event => {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("username");
      window.open("/index.html", "_self"); //Reload the window to make the changes appear.
    });
  }
if (user) {
  const usergreeting = document.createElement("p"); //Create greeting box for logged in users
  usergreeting.classList = "gray-text";
  usergreeting.innerHTML = `Hello ${user}`;
  greetingBox.appendChild(usergreeting);
  
  const addDataBtn = document.createElement("BUTTON"); //Create greeting box for logged in users
  addDataBtn.classList = "btn-floating waves-effect waves-light orange";
  addDataBtn.innerHTML = `+`;
  addDataBox.appendChild(addDataBtn);

  addDataBtn.addEventListener("click", event => {
    window.alert("This functionality is not complete! Select scenario to proceed!"); //Get the user to the
  });
}
else{
  greetingBox.classList = "invisible";
  addDataBox.classList = "invisible";
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














