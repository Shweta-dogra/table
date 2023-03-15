//selectors
const tableEle = document.querySelector(".table");
const tableBody = document.querySelector("#tableBody");
const addBtn = document.querySelector("#add");
const upBtn = document.querySelector("#up");
const downBtn = document.querySelector("#down");
const deleteBtn = document.querySelector("#delete");
const refreshBtn = document.querySelector("#refresh");
const saveBtn = document.querySelector("#save");
const nextBtn = document.querySelector('#nextButton');
const prevBtn = document.querySelector('#prevButton');

//new row elements
let chemical = document.getElementById("Chem");
let chem_id = document.getElementById("idx");
let vendor = document.getElementById("vendor");
let density = document.getElementById("density");
let viscosity = document.getElementById("viscosity");
let package = document.getElementById("packaging");
let size = document.getElementById("packsize");
let unit = document.getElementById("unit");
let quantity = document.getElementById("quantity");


let arr =[{id: 1, "Chemical name": "Ammonium Persulfate", Vender: "LG Chem", Density: "3525.92", Viscosity: "60.631", Packaging: "Bag", "Pack size": "100.00", Unit: "Kg", Quantity: "6495.18"},
{id: 2, "Chemical name": "Caustic Potash", Vender: "Formosa", Density: "3172.15", Viscosity: "48.221", Packaging: "Bag", "Pack size": "100.00", Unit: "Kg", Quantity: "8751.90"},
{id: 3, "Chemical name": "Dimethylaminopropylamino", Vender: "LG Chem", Density: "8435.37", Viscosity: "12.62", Packaging: "Barrel", "Pack size": "75.00", Unit: "L", Quantity: "5964.61"},
{id: 4, "Chemical name": "Mono Ammonium Phosphate", Vender: "Sinopec", Density: "1597.65", Viscosity: "76.51", Packaging: "Bag", "Pack size": "105.00", Unit: "Kg", Quantity: "8183.73"},
{id: 5, "Chemical name": "Ferric itrate", Vender: "DowDuPont", Density: "364.04", Viscosity: "14.90", Packaging: "Bag", "Pack size": "105.00", Unit: "Kg", Quantity: "4154.33"},
{id: 6, "Chemical name": "n-Pentane", Vender: "Sinopec", Density: "4535.26", Viscosity: "66.76", Packaging: "N/A", "Pack size": "N/A", Unit: "t", Quantity: "6272.34"},
{id: 7, "Chemical name": "Glycol Ether PM", Vender: "LG Chem", Density: "6495.18", Viscosity: "72.12", Packaging: "Bag", "Pack size": "250.00", Unit: "Kg", Quantity: "8749.54"}
];

// let rowIdx = 1;
// function createTable(){
//     let df = document.createDocumentFragment();

//     for(ele of arr){
//         let tr = document.createElement("tr");
//         tr.setAttribute("id", rowIdx++);

//         for(val of Object.values(ele)){
//             let td = document.createElement("td");
//             td.innerHTML = val;
//             tr.appendChild(td);
//         }
//         // let td_1 = document.createElement("td");
//         // td_1.innerHTML = `<i class="bi bi-check-lg"></i>`;
        
//         df.appendChild(tr);
//     }
//     tableBody.appendChild(df);
// }


// createTable();

// //add row functionality
// document.getElementById("saveRow").addEventListener("click", ()=>{
//     // tableBody.remove();
//     let chemical = document.getElementById("Chem");
//     let chem_id = document.getElementById("idx");
//     let vendor = document.getElementById("vendor");
//     let density = document.getElementById("density");
//     let viscosity = document.getElementById("viscosity");
//     let package = document.getElementById("packaging");
//     let size = document.getElementById("packsize");
//     let unit = document.getElementById("unit");
//     let quantity = document.getElementById("quantity");

//     let obj = {};
//     obj["id"] = rowIdx; //chem_id
//     obj["chemicalname"] = chemical.value;
//     obj["Vender"] = vendor.value;
//     obj["Density"] = density.value;
//     obj["Viscosity"] = viscosity.value;
//     obj["Packaging"] = package.value;
//     obj["Pack size"] = size.value;
//     obj["Unit"] = unit.value;
//     obj["Quantity"] = quantity.value;
//     arr.push(obj);
    

//     let tr = document.createElement("tr");
//     tr.setAttribute("id", rowIdx++);

//     for(val of Object.values(obj)){
//         let td = document.createElement("td");
//         td.innerHTML = val;
//         tr.appendChild(td);
//     }
//     tableBody.appendChild(tr);

//     chem_id.value="";
//     chemical.value ="";
//     vendor.value ="";
//     density.value ="";
//     viscosity.value = "";
//     package.value = "";
//     size.value = "";
//     unit.value = "";
//     quantity.value = "";
    
// })

// //delete row functionality
// var rows = document.getElementsByTagName("tr");
// deleteBtn.addEventListener("click", ()=>{

// })






document.addEventListener('DOMContentLoaded', loadFn, false);

let sortCol;
let sortAsc = false;
const pageSize = 15;
let curPage = 1;

function loadFn() { 

  document.querySelectorAll('#myTable thead tr th').forEach(t => {
     t.addEventListener('click', sortTable, false);
  });
  
  nextBtn.addEventListener('click', nextPage, false);
  prevBtn.addEventListener('click', previousPage, false);
}


function createTable() {
  
  let newRow = '';
  arr.filter((row, index) => {
        let start = (curPage-1)*pageSize;
        let end =curPage*pageSize;
        if(index >= start && index < end) return true;
  }).forEach(c => {
     newRow += `<tr>
     <td>${c["id"]}</td>
     <td>${c["Chemical name"]}</td>
     <td>${c["Vender"]}</td>
     <td>${c["Density"]}</td>
     <td>${c["Viscosity"]}</td>
     <td>${c["Packaging"]}</td>
     <td>${c["Pack size"]}</td>
     <td>${c["Unit"]}</td>
     <td>${c["Quantity"]}</td>
     </tr>`;
  });
  tableBody.innerHTML = newRow;
  //console.log(newRow);
}
createTable();
localStorage.setItem('tableArray', JSON.stringify(arr));


//sort functionality

function sortTable(e) {
  let thisSort = e.target.dataset.sort;
  if(sortCol === thisSort) sortAsc = !sortAsc;
  sortCol = thisSort;
  console.log('sort dir is ', sortAsc);
  arr.sort((a, b) => {
    if(a[sortCol] < b[sortCol]) return sortAsc?1:-1;
    if(a[sortCol] > b[sortCol]) return sortAsc?-1:1;
    return 0;
  });
  createTable();
}

//pagination fxn

function previousPage() {
  if(curPage > 1) curPage--;
  createTable();
}

function nextPage() {
  if((curPage * pageSize) < arr.length) curPage++;
  createTable();
}

//add new Row
document.getElementById("saveRow").addEventListener("click", ()=>{

    let obj = {};
    obj["id"] = chem_id.value;
    obj["Chemical name"] = chemical.value;
    obj["Vender"] = vendor.value;
    obj["Density"] = density.value;
    obj["Viscosity"] = viscosity.value;
    obj["Packaging"] = package.value;
    obj["Pack size"] = size.value;
    obj["Unit"] = unit.value;
    obj["Quantity"] = quantity.value;
    arr.push(obj);

    createTable();
    selectRow();

    chem_id.value="";
    chemical.value ="";
    vendor.value ="";
    density.value ="";
    viscosity.value = "";
    package.value = "";
    size.value = "";
    unit.value = "";
    quantity.value = "";
})

document.getElementById("cancelRow").addEventListener("click", ()=>{
    chem_id.value="";
    chemical.value ="";
    vendor.value ="";
    density.value ="";
    viscosity.value = "";
    package.value = "";
    size.value = "";
    unit.value = "";
    quantity.value = "";
})
//select a row
var rowIdx;

function selectRow(){
    
    for(var i = 1; i < tableEle.rows.length; i++){
        tableEle.rows[i].onclick = function(){ 
            if(typeof rowIdx !== "undefined"){
                tableEle.rows[rowIdx].classList.toggle("selected");
            }
                       
            rowIdx = this.rowIndex;
            this.classList.toggle("selected");
            //console.log(rowIdx, tableEle.rows.length)
        };
    }                 
}
selectRow();

//move row up
upBtn.addEventListener("click", ()=>{
    var rowEle = tableEle.rows;
    parent = rowEle[rowIdx].parentNode;
    if(rowIdx > 1){
        parent.insertBefore(rowEle[rowIdx],rowEle[rowIdx - 1]);
        rowIdx--;
    }
})


//move row down
downBtn.addEventListener("click", ()=>{
    var rowEle = tableEle.rows;
    parent = rowEle[rowIdx].parentNode;
    if(rowIdx < rowEle.length -1){
        parent.insertBefore(rowEle[rowIdx + 1],rowEle[rowIdx]);
        let temp = arr[rowIdx];
        arr[rowIdx] = arr[rowIdx-1];
        arr[rowIdx-1] = temp;
        rowIdx++;
    }
})


//delete row
deleteBtn.addEventListener("click", ()=>{
    tableEle.deleteRow(rowIdx);
    arr.splice(rowIdx-1, 1);
    //console.log(arr);
    
})

//reset all
refreshBtn.addEventListener("click", ()=>{
    arr = JSON.parse(localStorage.getItem('tableArray'));
    createTable();
    
})

//save changes
saveBtn.addEventListener("click", ()=>{
    localStorage.setItem('tableArray', JSON.stringify(arr));
    selectRow();
})
