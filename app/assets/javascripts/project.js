var backgroundColor = function(project){
	if (!project.photos[project.current_photo].background_color){
		return "#282627";
	}
	return project.photos[project.current_photo].background_color;
}

var ProjectWindow = function(hasTitle) {
	this.hasTitle = hasTitle;
	this.isOpen = false;
	this.imageReady = false;
	this.transitionReady = false;
	this.project = null;
	this.height = 40;
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
			$this.refocusInitial($project);
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
		$this.refocusInitial($project);
		$this.create();
		$this.queue.push(function(){
			$this.hideSpinner();
			$this.updateFields();
			$this.resize();
		})
		$this.blockerFinished("transition");
	}
}

ProjectWindow.prototype.showSpinner = function() {
	$("#project-window .spinner").show();
}

ProjectWindow.prototype.hideSpinner = function() {
	$("#project-window .spinner").hide();
}

ProjectWindow.prototype.getData = function($project) {
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

ProjectWindow.prototype.refocusInitial = function(project_div) {
	var $project = $(project_div);
	var extra = 0;
	if ($("#project-window").length > 0){
		if ($project.offset().top > $("#project-window").offset().top){
			extra = $("#project-window").height();
		}
	}
	$('html, body').stop().animate({
   	scrollTop: $project.offset().top + $project.outerHeight() - extra - 55
 	}, this.transitionSpeed);
}

ProjectWindow.prototype.refocusFinal = function() {
	$('html, body').stop().animate({
   	scrollTop: $("#project-window").offset().top - 80
 	}, this.transitionSpeed);
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
	$("#project-window").animate({height: $this.height}, $this.transitionSpeed, function() {
		$this.refocusFinal();
	});
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
	var $this = this;
	$this.updateFields();
	$("#project-window .inner").fadeTo(this.transitionSpeed, 1, function(){
		$this.refocusFinal();
	});
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
	if (this.hasTitle){
		return "<div id='project-window'><div class='spinner'><div class='inner'></div></div><div class='container'><div class='close-container'><div class='close'><i class='icon-remove button'></i>CLOSE</div></div><div class='padding'><div class='inner'><div class='image'><img src=''/></div><div class='information'><div class='pal'><h2></h2><p></p></div></div></div></div></div></div>";
	}
	else {
		return "<div id='project-window'><div class='spinner'><div class='inner'></div></div><div class='container'><div class='close-container'><div class='close'><i class='icon-remove button'></i>CLOSE</div></div><div class='padding'><div class='inner'><img src=''/></div></div></div></div>";
	}
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
	var projectWindow = new ProjectWindow($(".project:first").attr("data-title") == "true");

	$(".project").click(function(){
		projectWindow.showProject(this);
	});

	$("body").on("click", ".close", function() {
		projectWindow.close(projectWindow.remove);
	})
});