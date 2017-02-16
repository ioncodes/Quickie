const {
    clipboard
} = require('electron');
var ul = document.getElementsByTagName('UL')[0];
var progress = document.getElementById('search-progress');

var totalItems = 0;
var l = fa.length;
totalItems += l;
var html = '';
for (var i = 0; i < l; i++) {
    html += '<li><i class="fa ' + fa[i] + ' fa-4x"></i></li>';
}
l = ma.length;
totalItems += l;
for (var i = 0; i < l; i++) {
    html += '<li><i class="material-icons md-64">' + ma[i] + '</i></li>';
}
l = oc.length;
totalItems += l;
for (var i = 0; i < l; i++) {
    html += '<li><i class="octicon ' + oc[i] + '"></i></li>';
}
ul.innerHTML = html;

progress.setAttribute('max', totalItems);

$("#search-btn").on('click', function() {
    search();
});

$('#search').keypress(function(e) {
    if (e.keyCode == 13) {
        search();
    }
});

$(document).on("click", "li", function(event) {
    var html;
    if (event.target.className.indexOf('fa') !== -1) {
        html = '<i class="' + event.target.className + '" aria-hidden="true"></i>';
    } else if(event.target.className.indexOf('material-icons') !== -1){
        html = '<i class="material-icons">' + event.target.textContent + '"</i>';
    } else {
        html = '<i class="'+event.target.className+'"></i>';
    }
    clipboard.writeText(html);
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 2000);
});

function search() {
    progress.setAttribute('value', '0')
    var elements = document.getElementsByTagName('i');
    html = '';
    l = elements.length;
    var value = $("#search").val();
    for (var i = 0; i < l; i++) {
        var element = elements[i];
        if (element.id !== 'search-btn') {
            if (element.className.indexOf(value) === -1 && element.textContent.indexOf(value) === -1) {
                if (element.className.indexOf('fa ') !== -1) {
                    html += '<li><i style="visibility: hidden; position: absolute;" class="' + element.className + '"></i></li>';
                } else if (element.className.indexOf('material-icons') !== -1) {
                    html += '<li><i style="visibility: hidden; position: absolute;" class="material-icons md-64">' + element.textContent + '</i></li>';
                } else {
                    html += '<li><i style="visibility: hidden; position: absolute;" class="' + element.className + '"></i></li>';
                }
            } else {
                if (element.className.indexOf('fa ') !== -1) {
                    html += '<li><i style="visibility: visible;" class="' + element.className + '"></i></li>';
                } else if (element.className.indexOf('material-icons') !== -1) {
                    html += '<li><i style="visibility: visible;" class="material-icons md-64">' + element.textContent + '</i></li>';
                } else {
                    html += '<li><i style="visibility: visible;" class="' + element.className + '"></i></li>';
                }
            }
        }
        progress.setAttribute('value', i + 1);
    }
    ul.innerHTML = html;
}
