class BrandingsController < ApplicationController
	def index
		@brandings = Branding.all

		respond_to do |format|
			format.html
		end
	end

	def show
		branding = Branding.where(:id => params[:id]).last

		photos = []
		branding.photos.each do |photo|
			photos << {:url => photo.image.url(:large), :background_color => photo.background_color}
		end
		branding = {:title => branding.title, :description => branding.description, :photos => photos} 
    render :json => branding
	end
end