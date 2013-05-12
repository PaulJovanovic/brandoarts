class WebsController < ApplicationController
	def index
		@webs = Web.all
		
		respond_to do |format|
			format.html
		end
	end

	def show
		web = Web.where(:id => params[:id]).last

		photos = []
		web.photos.each do |photo|
			photos << {:url => photo.image.url(:large), :background_color => photo.background_color}
		end
		web = {:title => web.title, :description => web.description, :photos => photos} 
    render :json => web
	end
end