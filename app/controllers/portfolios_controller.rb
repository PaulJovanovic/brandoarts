class PortfoliosController < ApplicationController
	def index
		@portfolios = Portfolio.all

		respond_to do |format|
			format.html
		end
	end

	def show
		portfolio = Portfolio.where(:id => params[:id]).last

		photos = []
		portfolio.photos.each do |photo|
			photos << {:url => photo.image.url(:original)}
		end
		portfolio = {:photos => photos} 
    render :json => portfolio
	end
end