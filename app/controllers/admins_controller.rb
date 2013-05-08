class AdminsController < ApplicationController
	before_filter :authenticate_admin!

	layout "admins"

	def index
		respond_to do |format|
			format.html
		end
	end

end