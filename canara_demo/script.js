// Function to fetch Excel data and provide it to a callback
function fetchofficeData(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'data/Sample Branch list for mapping.ods', true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = function () {
    var arrayBuffer = xhr.response;
    var data = new Uint8Array(arrayBuffer);
    var workbook = XLSX.read(data, { type: 'array' });
    var sheetName = workbook.SheetNames[1];
    var sheet = workbook.Sheets[sheetName];
    var officedata = XLSX.utils.sheet_to_json(sheet);

    callback(officedata); // Pass the data to the callback
  };
  xhr.send();
}

function fetchflsData(callback) {
  var xhr1 = new XMLHttpRequest();
  xhr1.open('GET', "data/McDonald's.ods", true);
  xhr1.responseType = 'arraybuffer';

  xhr1.onload = function () {
    var arrayBuffer1 = xhr1.response;
    var data1 = new Uint8Array(arrayBuffer1);
    var workbook1 = XLSX.read(data1, { type: 'array' });
    var sheetName1 = workbook1.SheetNames[0];
    var sheet1 = workbook1.Sheets[sheetName1];
    var flsdata = XLSX.utils.sheet_to_json(sheet1);

    callback(flsdata); // Pass the data to the callback
  };
  xhr1.send();
}

function fetchstateboundary(callback){
  $.getJSON('data/Delhi_State_Boundary.geojson', function(data){
    var state_bound = data;
    callback(state_bound);
  });
}

function updatetableoffice(stateName, branchName, Address, Category){
  var tableBody = document.getElementById('RightCelloffice');
  var newRow = document.createElement('tr');

  var stateCell = document.createElement('td');
  stateCell.textContent = stateName;

  var branchCell = document.createElement('td');
  branchCell.textContent = branchName;

  var categoryCell = document.createElement('td');
  categoryCell.textContent = Category;

  var addressCell = document.createElement('td');
  addressCell.textContent = Address;


  newRow.appendChild(stateCell);
  newRow.appendChild(branchCell);
  newRow.appendChild(categoryCell);
  newRow.appendChild(addressCell);

  tableBody.appendChild(newRow);
}

function updatetablefls(stateName, branchName, Address){
  var tableBody = document.getElementById('RightCellfls');
  var newRow = document.createElement('tr');

  var stateCell = document.createElement('td');
  stateCell.textContent = stateName;

  var branchCell = document.createElement('td');
  branchCell.textContent = branchName;

  var addressCell = document.createElement('td');
  addressCell.textContent = Address;


  newRow.appendChild(stateCell);
  newRow.appendChild(branchCell);
  newRow.appendChild(addressCell);

  tableBody.appendChild(newRow);
}

function generatePDF() {
  const content = document.getElementById('RightPanelContent').innerHTML;
  const filename = 'BranchDetails.pdf';

  const options = {
    margin: 0.25,
    filename,
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
    // Additional style options
    image: { type: 'jpeg', quality: 0.98 },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    font: { size: 6 },
    watermark: { text: 'Sample Watermark', alpha: 0.3 }
  };

  html2pdf().set(options).from(content).save();
}