/*
 Задача - написать функцию, которая принимает объект
 с самолетами в ангаре и техниками, и возвращает
 массив объектов находящихся на обслуживании самолетов (servicedBy),
 в которых помимо изначальных данных содержатся также имена работающих над ними техников.

 */

/*
 var xhr = new XMLHttpRequest();
 xhr.open('GET', 'data/hangar.json');
 xhr.send(null);

 xhr.onreadystatechange = function () {
 var OK = 200; // status 200 is a successful return.
 var ERROR = 400;
 if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === OK) {
 var data = JSON.parse(xhr.responseText);
 var techs = data[0].techs;
 var jetsOnService = data[0].jets.filter(function(obj) {
 return 'servicedBy' in obj
 });

 jetsOnService.map(function(jet) {
 techs.forEach(function(tech) {
 if(jet['servicedBy'] === tech['id']) {
 jet.manager = tech['name'];
 }
 else if(!jet.manager) {
 jet.manager = 'no manager found with such ID';
 }
 });
 });
 console.log(jetsOnService);
 }
 else if(xhr.status >= ERROR) {
 console.log('Error: ' + xhr.status); // An error occurred during the request.
 }
 };
 */