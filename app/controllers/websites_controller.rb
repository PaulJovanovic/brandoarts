class WebsitesController < ApplicationController
	def index
		@websitess = Website.all
		
		respond_to do |format|
			format.html
		end
	end

	def show
		website = Website.where(:id => params[:id]).last

		photos = []
		website.photos.each do |photo|
			photos << {:url => photo.image.url(:large), :background_color => photo.background_color}
		end
		website = {:title => website.title, :description => website.description, :photos => photos} 
    render :json => website
	end
end