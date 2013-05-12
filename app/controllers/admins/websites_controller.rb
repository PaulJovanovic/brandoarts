class Admins::WebsitesController < ApplicationController

	before_filter :authenticate_admin!

	layout "admins"

	def index
		@websites = Website.all

		respond_to do |format|
			format.html
		end
	end

	def new
		@website = Website.new
		@website.photos.build

		respond_to do |format|
			format.html
		end
	end

	def create
		@website = Website.new(params[:website])
		@website.placement = Website.count
		
		if @website.save
	  	respond_to do |format|
	      format.html  { redirect_to(admins_website_path(@website),
	                    :notice => 'Website was successfully created.') }
	    end
    else
      redirect_to new_admins_website_path
    end
	end

	def show
		@website = Website.where(:id => params[:id]).last

		if @website
			respond_to do |format|
				format.html
			end
		else
			redirect_to admins_websites_path
		end
		
	end

	def edit
    @website = Website.where(:id => params[:id]).last
  end

  def update
    @website = Website.where(:id => params[:id]).last

    respond_to do |format|
      if @website.update_attributes(params[:website])
        format.html { redirect_to admins_websites_path, notice: 'Website was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end

	def destroy
    website = Website.where(:id => params[:id]).last

    if website
	    Photo.where(:project_id => params[:id]).each do |photo|
	    	photo.destroy
	  	end
			website.destroy
	  end
	  respond_to do |format|
      format.html { redirect_to admins_websites_path }
    end
  end

end