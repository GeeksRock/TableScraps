var TableScraps = function (){
  var scraps = [],
  GetTableScraps = function (headers, rows) {
    headers = document.querySelectorAll(headers);
    rows = document.querySelectorAll(rows);
  
    for (var row = 0; row < rows.length; row++) {
      var scrap = {};
      var cells = rows[row].cells;
      for (var o = 0; o < headers.length; o++) {
        Object.defineProperty(scrap, headers[o].textContent, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: cells[o].textContent
        });
      }
      scraps.push(scrap);
    }
  },
  DownloadTableScraps = function (thSelector, trSelector) {       
    GetTableScraps(thSelector, trSelector);
    var body = document.querySelector('body');
    var a = document.createElement('a');
    a.style.display = 'none';
    body.appendChild(a);
    var file = new Blob([JSON.stringify(scraps)], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'tablescraps.json';
    a.click();
  }, 
  LogTableScraps = function (thSelector, trSelector) {
    GetTableScraps(thSelector, trSelector);
    console.table("tablescraps", scraps) || console.dir("tablescraps", scraps) || console.log("tablescraps", scraps);
  };

  return {
    DownloadTableScraps: DownloadTableScraps,
    LogTableScraps: LogTableScraps 
  };
}();