var project_click = false;

var backgroundColor = function(project){
	if (!project.photos[project.current_photo].background_color){
		return "#282627";
	}
	return project.photos[project.current_photo].background_color;
}

var ProjectWindow = function() {
	this.isOpen = false;
	this.imageReady = false;
	this.transitionReady = false;
	this.project = null;
	this.height = 0;
	this.index = null;
	this.transitionSpeed = 600;
	this.queue = [];
}

ProjectWindow.prototype.showProject = function($project) {
	var $this = this;
	$this.imageReady = false;
	$this.transitionReady = false;
	$this.getData($project);
	var rowIndex = Math.floor($(".project").index($project) / 3);
	//if a project is open
	if ($this.isOpen){
		//if project is in the same row
		if($this.index == rowIndex){
			$this.fadeOut(function(){
				$this.queue.push(function() {
					$this.update($project);
				});
				$this.blockerFinished("transition");
			});
		}
		else{
			$this.index = rowIndex;
			$this.close(function(){
				$this.queue.push(function() {
					$this.updateFields();
					$this.open();
				});
				$this.blockerFinished("transition");
			});
		}
	}
	else {
		$this.index = rowIndex;
		$this.queue.push(function(){
			$this.create();
		});
		$this.blockerFinished("transition");
	}
}

ProjectWindow.prototype.getData = function($project){
	var $this = this;
	$.ajax({
		type: "GET",
		url: "/" + $($project).attr("data-controller") + "/" + $($project).attr("data-id"),
		datatype: "JSON"
	}).success(function(data){
		$this.project = new Project(data);
		var img = new Image();
    img.src = $this.project.photos[$this.project.current_photo].url;
		img.onload = function() {
    	$this.height = this.height + 140;
    	$this.blockerFinished("image");
    }
	});
}

ProjectWindow.prototype.blockerFinished = function(blocker) {
	this[blocker + "Ready"] = true;
	if (this.transitionReady && this.imageReady) {
		this.emptyQueue();
	}
}

ProjectWindow.prototype.emptyQueue = function() {
	for (var i = 0; i < this.queue.length; i++) {
		this.queue[i]();
	}
	this.queue = [];
}

ProjectWindow.prototype.create = function($project){
	var $this = this;
	$("#content .container").eq($this.index).after($this.css());
	$this.open();
}

ProjectWindow.prototype.update = function($project){
	this.resize();
	this.fadeIn();
}

ProjectWindow.prototype.open = function(){
	var $this = this;
	$this.isOpen = true;
	var temp = $("#project-window").detach();
	$("#content .container").eq($this.index).after(temp);
	$("#project-window").animate({height: $this.height}, $this.transitionSpeed);
	$('html, body').animate({
   	scrollTop: $("#project-window").offset().top - 80
 	}, $this.transitionSpeed);
}

ProjectWindow.prototype.close = function(callback){
	var $this = this;
	$this.isOpen = false;
	$("#project-window").animate({height: "0px"}, 2 * $this.transitionSpeed / 3, function(){
		callback();
	});
}

ProjectWindow.prototype.remove = function(){
	$("#project-window").remove();
}

ProjectWindow.prototype.updateFields = function(){
	$("#project-window").css("backgroundColor", backgroundColor(this.project));
	$("#project-window img").attr("src", this.project.photos[this.project.current_photo].url);
	$("#project-window .information h2").html(this.project.title);
	$("#project-window .information p").html(this.project.description);
}

ProjectWindow.prototype.fadeIn = function(){
	this.updateFields();
	$("#project-window .inner").fadeTo(this.transitionSpeed, 1);
}

ProjectWindow.prototype.fadeOut = function(callback){
	$("#project-window .inner").fadeTo(this.transitionSpeed, .01, function(){
		callback();
	});
}

ProjectWindow.prototype.resize = function(){
	var $this = this;
	var img = new Image();
  img.src = $this.project.photos[$this.project.current_photo].url;
  $("#project-window").animate({height: $this.height}, $this.transitionSpeed);
}

ProjectWindow.prototype.css = function(){
	if(typeof this.project.title !== "undefined"){
		return "<div id='project-window' style='background-color:"+backgroundColor(this.project)+"'><div class='container'><div class='padding'><div class='inner'><div class='image'><img src='"+this.project.photos[this.project.current_photo].url+"'/></div><div class='information'><div class='pal'><h2>"+this.project.title+"</h2><p>"+this.project.description+"</p></div></div></div></div></div></div>";
	}
	return "<div id='project-window' style='background-color:"+backgroundColor(this.project)+"'><div class='container'><div class='padding'><div class='inner'><img src='"+this.project.photos[this.project.current_photo].url+"'/></div></div></div></div></div>";
}

var Photo = function(url, background_color){
	this.url = url;
	this.background_color = background_color;
}

var Project = function(project) {
	if(typeof project.title === "undefined"){
		this.photos = new Array();
		for (var i = 0; i < project.photos.length; i++){
			this.photos.push(new Photo(project.photos[i].url, null))
		}
	}
	else {
		this.title = project.title;
		this.description = project.description;
		this.photos = new Array();
		for (var i = 0; i < project.photos.length; i++){
			this.photos.push(new Photo(project.photos[i].url, project.photos[i].background_color))
		}
	}
	this.current_photo = 0;
	return this;
};

$(document).ready(function(){
	var projectWindow = new ProjectWindow();

	$(".project").click(function(){
		projectWindow.showProject(this);
	});
});