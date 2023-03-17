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
const editBtn = document.querySelectorAll(".editBtn");

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
{id: 7, "Chemical name": "Ether", Vender: "LG Chem", Density: "6495.18", Viscosity: "72.12", Packaging: "Bag", "Pack size": "250.00", Unit: "Kg", Quantity: "8749.54"},
{id: 8, "Chemical name": "Glucose", Vender: "DowDuPont", Density: "578.87", Viscosity: "17.98", Packaging: "Barrel", "Pack size": "250.00", Unit: "Kg", Quantity: "7156.39"},
{id: 9, "Chemical name": "Methane", Vender: "LG Chem", Density: "5149.18", Viscosity: "65.32", Packaging: "Bag", "Pack size": "100.00", Unit: "L", Quantity: "8749.54"},
{id: 10, "Chemical name": "Ethane", Vender: "Sinopec", Density: "8735.14", Viscosity: "32.87", Packaging: "Bag", "Pack size": "100.00", Unit: "Kg", Quantity: "8459.67"},
{id: 11, "Chemical name": "Polyethene", Vender: "LG Chem", Density: "925.54", Viscosity: "22.65", Packaging: "Barrel", "Pack size": "250.00", Unit: "Kg", Quantity: "5632.14"},
{id: 12, "Chemical name": "Ferrous sulphate", Vender: "LG Chem", Density: "6490.28", Viscosity: "81.12", Packaging: "Bag", "Pack size": "107.00", Unit: "Kg", Quantity: "7649.54"},
{id: 13, "Chemical name": "Poly Methane", Vender: "Sinopec", Density: "3295.18", Viscosity: "12.98", Packaging: "Bag", "Pack size": "100.00", Unit: "t", Quantity: "4236.76"},
{id: 14, "Chemical name": "Ammonium Dioxide", Vender: "LG Chem", Density: "2765.09", Viscosity: "52.12", Packaging: "Bag", "Pack size": "105.00", Unit: "Kg", Quantity: "3449.54"},
{id: 15, "Chemical name": "Acetic Acid", Vender: "Formosa", Density: "865.87", Viscosity: "70.12", Packaging: "Bag", "Pack size": "100.00", Unit: "Kg", Quantity: "6477.09"},
];

let selectedRow = [];
let rowIdx = 1;


document.addEventListener('DOMContentLoaded', loadFn, false);

const pageSize = 15;
let curPage = 1;

function loadFn() { 

  nextBtn.addEventListener('click', nextPage, false);
  prevBtn.addEventListener('click', previousPage, false);
}


function createTable() {
    // <td><button class="editBtn fxnBtn"><i class="bi bi-check-lg"></i></button></td>
  let newRow = '';
  arr.filter((row, index) => {
        let start = (curPage-1)*pageSize;
        let end =curPage*pageSize;
        if(index >= start && index < end) return true;
  }).forEach(c => {
     newRow += `<tr>
     <td data-id="${c["id"]}">${c["id"]}</td>
     <td>${c["Chemical name"]}</td>
     <td>${c["Vender"]}</td>
     <td contentEditable><input class="input" type="Number" value="${c["Density"]}" onChange="changeFn(this)" /></td>
     <td><input type="Number" value="${c["Viscosity"]}"  onChange="changeFn(this)"/></td>
     <td>${c["Packaging"]}</td>
     <td>${c["Pack size"]}</td>
     <td>${c["Unit"]}</td>
     <td><input type="Number" value="${c["Quantity"]}" onChange="changeFn(this)"/></td>
     </tr>`;
     
  });
  tableBody.innerHTML = newRow;
  
}
createTable();
localStorage.setItem('tableArray', JSON.stringify(arr));


//sort functionality

 function sortTable(n) {
    var rows, i, x, y, shouldSwitch, switching = true, sortDirection = "asc", switchcount = 0;
    
    while (switching) {
      switching = false;
      rows = tableEle.rows;
      
      for (i = 1; i < (rows.length - 1); i++) {
        
        shouldSwitch = false;
        
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        
        if (sortDirection == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            
            shouldSwitch = true;
            break;
          }
        } else if (sortDirection == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        
        switchcount ++;
      } else {
        
        if (switchcount == 0 && sortDirection == "asc") {
          sortDirection = "desc";
          switching = true;
        }
      }
    }
    
    if(n==0 && sortDirection == "asc"){
        arr.sort((a, b) => {
            return a.id - b.id;
        });
        
    } else if(n==0 && sortDirection == "desc"){
        arr.reverse();
        
    }
    if(n==1 && sortDirection == "asc"){
        arr.sort(function(a, b) {
            const A = a["Chemical name"].toUpperCase(); 
            const B = b["Chemical name"].toUpperCase(); 
            if (A < B) {
              return -1;
            }
            if (A > B) {
              return 1;
            }
          
            return 0;
          });
        
    } else if(n==1 && sortDirection=="desc"){
        arr.reverse();
         
    }

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
tableBody.addEventListener("click", (e)=>{
    if(e.target.tagName == 'TD'){
        let element = e.target.parentNode;
        let td = element.firstElementChild;
        let id = td.dataset.id;
        
        e.target.parentNode.classList.toggle("selected");
        if(e.target.parentNode.classList.contains("selected")){
            selectedRow.push(id);
        } else{
            selectedRow=selectedRow.filter((ele, i)=>{
                if(ele!=id){
                    return ele;
                }
            })
        }
        // console.log(selectedRow)
    }
})

//move row
function getSelectedRow(){
                
                for(var i = 1; i < tableEle.rows.length; i++)
                {
                    tableEle.rows[i].onclick = function()
                    {
                        rowIdx = this.rowIndex;
                    };
                }      
            }
            getSelectedRow();

//move row up
upBtn.addEventListener("click", ()=>{
    var rowEle = tableEle.rows;
    parent = rowEle[rowIdx].parentNode;
    if(rowIdx > 1){
        parent.insertBefore(rowEle[rowIdx],rowEle[rowIdx - 1]);
        let temp = arr[rowIdx-1];
        arr[rowIdx-1] = arr[rowIdx-2];
        arr[rowIdx-2] = temp;
        rowIdx--;
    }
    console.log(arr);
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
    console.log(arr);
})


//delete row
deleteBtn.addEventListener("click", ()=>{
    // tableEle.deleteRow(rowIdx);
    // arr.splice(rowIdx-1, 1);
    // //console.log(arr);
    for(let i=0; i<arr.length; i++){
        for(let j =0; j<selectedRow.length; j++){
            if(arr[i] != null && arr[i]["id"]==selectedRow[j]){
                arr[i] = null;
                selectedRow[j] = null;
            }
        }
    }
    
    arr = arr.filter((ele)=>{
        if(ele != null){
            return ele;
        }
    });
    selectedRow = selectedRow.filter((ele)=>{
        if(ele != null){
            return ele;
        }
    });
    createTable();
    
    
})

//reset all
refreshBtn.addEventListener("click", ()=>{
    arr = JSON.parse(localStorage.getItem('tableArray'));
    createTable();
    
})

//save changes
saveBtn.addEventListener("click", ()=>{
    localStorage.setItem('tableArray', JSON.stringify(arr));

})

//edit row
function changeFn(e){
    let tableId = e.parentNode.parentNode.firstElementChild.innerText;
    let colId = e.parentNode.cellIndex;
    // console.log(e.parentNode.cellIndex);
    // console.log(e.value);

    for(let i =0; i<arr.length; i++){
        if(colId == 3 && arr[i]["id"]== tableId){
            arr[i]["Density"] = e.value;
        }
        if(colId == 4 && arr[i]["id"]== tableId){
            arr[i]["Viscosity"] = e.value;
        }
        if(colId == 8 && arr[i]["id"]== tableId){
            arr[i]["Quantity"] = e.value;
        }
    }
}


