// Function to fetch Excel data and provide it to a callback
// function fetchofficeData(callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'data/Sample Branch list for mapping.ods', true);
//   xhr.responseType = 'arraybuffer';

//   xhr.onload = function () {
//     var arrayBuffer = xhr.response;
//     var data = new Uint8Array(arrayBuffer);
//     var workbook = XLSX.read(data, { type: 'array' });
//     var sheetName = workbook.SheetNames[1];
//     var sheet = workbook.Sheets[sheetName];
//     var officedata = XLSX.utils.sheet_to_json(sheet);

//     callback(officedata); // Pass the data to the callback
//   };
//   xhr.send();
// }


function fetchboundary(callback){
  $.getJSON('data/data.geojson', function(data){
    var bound = data;
    callback(bound);
  });
}

// Generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 9)];
  }
  return color;
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

function generateMap(map) {
  map.setZoom(11);
  const content = document.getElementById('map').innerHTML;
  const filename = 'Map.pdf';

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