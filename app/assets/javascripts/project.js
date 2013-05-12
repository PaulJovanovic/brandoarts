var backgroundColor = function(project){
	if (!project.photos[project.current_photo].background_color){
		return "#282627";
	}
	return project.photos[project.current_photo].background_color;
}

var ProjectWindow = function(){
	this.isOpen = false;
	this.project = null;
}

ProjectWindow.prototype.close = function(){
	jQuery("#project-window").remove();
	this.open = false;
}

ProjectWindow.prototype.open = function(project, index, callback){
	this.project = project;
	rowIndex = Math.floor(index / 3);
	var $this = this;
	if($this.isOpen){
		if ($this.index == rowIndex){
			$this.updateTransition($this.project);
		}else{
			$this.index = rowIndex;
			$this.closeTransition(function(){
				jQuery("#content .container").eq($this.index).after($this.css($this.project));
				callback();
			});
		}
	}else{
		$this.isOpen = true;
		$this.index = rowIndex;
		jQuery("#content .container").eq($this.index).after($this.css($this.project));
		var img = new Image();
    img.src = project.photos[project.current_photo].url;
    img.onload = function() {
    	$this.height = this.height + 140;
    	jQuery("#project-window").height("0px");
			callback();
    }
	}
}

ProjectWindow.prototype.css = function(project){
	return "<div id='project-window' style='background-color:"+backgroundColor(project)+"'><div class='container'><div class='padding'><div class='inner'><div class='image'><img src='"+project.photos[project.current_photo].url+"'/></div><div class='information'><div class='pal'><h2>"+project.title+"</h2><p>"+project.description+"</p></div></div></div></div></div></div>";
}

ProjectWindow.prototype.openTransition = function(){
	jQuery("#project-window").animate({height: this.height}, 1000);
}

ProjectWindow.prototype.updateTransition = function(project){
	var $this = this;
	jQuery("#project-window .container").fadeOut(600, function(){
		jQuery("#project-window").css("backgroundColor", backgroundColor(project));
		jQuery("#project-window .image img").attr("src", project.photos[project.current_photo].url);
		jQuery("#project-window .information h2").html(project.title);
		jQuery("#project-window .information p").html(project.description);
		jQuery("#project-window .container").fadeIn(600);
	});
}

ProjectWindow.prototype.closeTransition = function(callback){
	jQuery("#project-window").animate({height: "0px"}, 1000, function(){
		jQuery("#project-window").remove();
		callback();
	});
}

var Photo = function(url, background_color){
	this.url = url;
	this.background_color = background_color;
}

var Project = function(title, description, photos) {
	this.title = title;
	this.description = description;
	this.photos = new Array();
	for (var i = 0; i < photos.length; i++){
		this.photos.push(new Photo(photos[i].url, photos[i].background_color))
	}
	this.current_photo = 0;
};

jQuery(document).ready(function(){
	var projectWindow = new ProjectWindow();

	jQuery(".project").click(function(){
		var controller = jQuery(this).attr("data-controller");
		var id = jQuery(this).attr("data-id");
		var $this = this;
		jQuery.ajax({
        type: "GET",
        url: "/"+controller+"/"+id,
        dataType: "JSON"
    }).success(function(data){
    	projectWindow.open(new Project(data.title, data.description, data.photos), jQuery(".project").index($this), function(){
    		projectWindow.openTransition();
    		jQuery('html, body').animate({
			   	scrollTop: jQuery("#project-window").offset().top - 80
		   	}, 1000);
    	});
    });
	});
});