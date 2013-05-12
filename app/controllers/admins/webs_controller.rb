class Admins::WebsController < ApplicationController

	before_filter :authenticate_admin!

	layout "admins"

	def index
		@webs = Web.all

		respond_to do |format|
			format.html
		end
	end

	def new
		@web = Web.new
		@web.photos.build

		respond_to do |format|
			format.html
		end
	end

	def create
		@web = Web.new(params[:website])
		@web.placement = Web.count
		
		if @web.save
	  	respond_to do |format|
	      format.html  { redirect_to(admins_web_path(@web),
	                    :notice => 'Website was successfully created.') }
	    end
    else
      redirect_to new_admins_web_path
    end
	end

	def show
		@web = Web.where(:id => params[:id]).last

		if @web
			respond_to do |format|
				format.html
			end
		else
			redirect_to admins_webs_path
		end
		
	end

	def edit
    @web = Web.where(:id => params[:id]).last
  end

  def update
    @web = Web.where(:id => params[:id]).last

    respond_to do |format|
      if @web.update_attributes(params[:website])
        format.html { redirect_to admins_webs_path, notice: 'Website was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end

	def destroy
    web = Web.where(:id => params[:id]).last

    if web
	    Photo.where(:project_id => params[:id]).each do |photo|
	    	photo.destroy
	  	end
			web.destroy
	  end
	  respond_to do |format|
      format.html { redirect_to admins_webs_path }
    end
  end

end