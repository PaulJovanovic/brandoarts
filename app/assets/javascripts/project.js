var project_click = false;

var backgroundColor = function(project){
	if (!project.photos[project.current_photo].background_color){
		return "#282627";
	}
	return project.photos[project.current_photo].background_color;
}

var ProjectWindow = function(){
	this.isOpen = false;
	this.project = null;
	this.index = null;
	this.height = 0;
	this.transitionSpeed = 600;
}

ProjectWindow.prototype.getData = function($project, callback){
	var $this = this;
	jQuery.ajax({
		type: "GET",
		url: "/" + jQuery($project).attr("data-controller") + "/" + jQuery($project).attr("data-id"),
		datatype: "JSON"
	}).success(function(data){
		$this.project = new Project(data);
		var img = new Image();
    img.src = $this.project.photos[$this.project.current_photo].url;
		img.onload = function() {
    	$this.height = this.height + 140;
			callback();
    }
	});
}

ProjectWindow.prototype.showProject = function($project){
	var $this = this;
	var rowIndex = Math.floor(jQuery(".project").index($project) / 3);
	//if a project is open
	if ($this.isOpen){
		//if project is in the same row
		if($this.index == rowIndex){
			$this.update($project);
		}
		else{
			$this.index = rowIndex;
			$this.close(function(){
				$this.getData($project, function(){
					$this.updateFields();
					$this.open($project);
				});
			});
		}
	}
	else {
		$this.index = rowIndex;
		$this.create($project);
	}
}

ProjectWindow.prototype.create = function($project){
	var $this = this;
	$this.isOpen = true;
	$this.getData($project, function(){
		jQuery("#content .container").eq($this.index).after($this.css());
		$this.open();
	});
}

ProjectWindow.prototype.update = function($project){
	var $this = this;
	$this.fadeOut(function(){
		$this.getData($project, function(){
			$this.fadeIn();
		});
	});
}

ProjectWindow.prototype.open = function(){
	var $this = this;
	$this.isOpen = true;
	var temp = jQuery("#project-window").detach();
	jQuery("#content .container").eq($this.index).after(temp);
	jQuery("#project-window").animate({height: $this.height}, $this.transitionSpeed);
	jQuery('html, body').animate({
   	scrollTop: jQuery("#project-window").offset().top - 80
 	}, $this.transitionSpeed);
}

ProjectWindow.prototype.close = function(callback){
	var $this = this;
	$this.isOpen = false;
	jQuery("#project-window").animate({height: "0px"}, $this.transitionSpeed, function(){
		callback();
	});
}

ProjectWindow.prototype.remove = function(){
	jQuery("#project-window").remove();
}

ProjectWindow.prototype.updateFields = function(){
	jQuery("#project-window").css("backgroundColor", backgroundColor(this.project));
	jQuery("#project-window img").attr("src", this.project.photos[this.project.current_photo].url);
	jQuery("#project-window .information h2").html(this.project.title);
	jQuery("#project-window .information p").html(this.project.description);
}

ProjectWindow.prototype.fadeIn = function(){
	this.updateFields();
	jQuery("#project-window .inner").fadeTo(this.transitionSpeed, 1);
}

ProjectWindow.prototype.fadeOut = function(callback){
	jQuery("#project-window .inner").fadeTo(this.transitionSpeed, .01, function(){
		callback();
	});
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

jQuery(document).ready(function(){
	var projectWindow = new ProjectWindow();

	jQuery(".project").click(function(){
		projectWindow.showProject(this);
	});
});

//click project
//start lock
//close
//load image / data
//open
//end lock