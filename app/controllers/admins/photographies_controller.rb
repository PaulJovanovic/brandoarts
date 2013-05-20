class Admins::PhotographiesController < ApplicationController

	before_filter :authenticate_admin!

	layout "admins"

	def index
		@photographies = Photography.all

		respond_to do |format|
			format.html
		end
	end

	def new
		@photography = Photography.new
		@photography.photos.build

		respond_to do |format|
			format.html
		end
	end

	def create
		@photography = Photography.new(params[:photography])
		@photography.placement = Photography.count

		if @photography.save
	  	respond_to do |format|
	      format.html  { redirect_to(admins_photography_path(@photography),
	                    :notice => 'Photo was successfully created.') }
	    end
    else
      redirect_to new_admins_photography_path
    end
	end

	def show
		@photography = Photography.where(:id => params[:id]).last

		if @photography
			respond_to do |format|
				format.html
			end
		else
			redirect_to admins_photographies_path
		end
		
	end

	def edit
    @photography = Photography.where(:id => params[:id]).last
  end

  def update
    @photography = Photography.where(:id => params[:id]).last

    respond_to do |format|
      if @photography.update_attributes(params[:photography])
        format.html { redirect_to admins_photographies_path, notice: 'Photo was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end

	def destroy
    photography = Photography.where(:id => params[:id]).last

    if photography
	    Photo.where(:imageable_id => params[:id]).each do |photo|
	    	photo.destroy
	  	end
			photography.destroy
	  end
	  respond_to do |format|
      format.html { redirect_to admins_photographies_path }
    end
  end

end