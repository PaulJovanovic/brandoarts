class PhotographiesController < ApplicationController
	def index
		@photographies = Photography.all

		respond_to do |format|
			format.html
		end
	end

	def show
		photography = Photography.where(:id => params[:id]).last

		photos = []
		photography.photos.each do |photo|
			photos << {:url => photo.image.url(:original)}
		end
		photography = {:photos => photos} 
    render :json => photography
	end
end