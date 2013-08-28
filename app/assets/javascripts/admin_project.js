// var AdminProject = function(div, index) {
//   this.div = $(div);
//   this.index = index;
// }

// AdminProject.prototype.bindDragEvents = function() {
//   this.div.draggable({
//     stop: function() {

//     }
//   });
// }

// AdminProject.prototype.calculateOrder = function() {
//   projects
// }

// AdminProject.prototype.findIndex = function() {
//   return this.recursivelyFindIndex(admin_projects, 0);
// }

// AdminProject.prototype.recursivelyFindIndex = function(arr) {
//   if (arr.length == 1){
//     return index;
//   }
//   if (arr[Math.round(arr.length / 2)].div.position().top > this.div.position().top ) {
//     return recursivelyFindIndex(arr[0, Math.round(arr.length / 2) + 1]);
//   }
//   else if(arr[Math.round(arr.length / 2)].div.position().top < this.div.position().top) {
//     return recursivelyFindIndex(arr[Math.round(arr.length / 2) + 1]);
//   }
//   return arr[Math.round(arr.length / 2)].div.index;
// }

// $(function(){
//   $("#sortable" ).sortable({
//     revert: true
//   });

//   var admin_projects = [];
//   $.each($(".list"), function() {
//     admin_projects.push(new AdminProject(this));
//   });
// });