class HomeController < ApplicationController
	layout "home"

	def index
		render :action => :index
	end

end