class BrandingsController < ApplicationController
	def index
		@brandings = Branding.all

		respond_to do |format|
			format.html
		end
	end
end