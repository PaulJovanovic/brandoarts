class Admins::PortfoliosController < ApplicationController

	before_filter :authenticate_admin!

	layout "admins"

	def index
		@portfolios = Portfolio.all

		respond_to do |format|
			format.html
		end
	end

	def new
		@portfolio = Portfolio.new
		@portfolio.photos.build

		respond_to do |format|
			format.html
		end
	end

	def create
		@portfolio = Portfolio.new(params[:portfolio])
		@portfolio.placement = Portfolio.count

		if @portfolio.save
	  	respond_to do |format|
	      format.html  { redirect_to(admins_portofolio_path(@portfolio),
	                    :notice => 'Misc was successfully created.') }
	    end
    else
      redirect_to new_admins_portofolio_path
    end
	end

	def show
		@portfolio = Portfolio.where(:id => params[:id]).last

		if @portfolio
			respond_to do |format|
				format.html
			end
		else
			redirect_to admins_portfolios_path
		end
		
	end

	def edit
    @portfolio = Portfolio.where(:id => params[:id]).last
  end

  def update
    @portfolio = Portfolio.where(:id => params[:id]).last

    respond_to do |format|
      if @portfolio.update_attributes(params[:portfolio])
        format.html { redirect_to admins_portfolios_path, notice: 'Misc was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end

	def destroy
    porfolio = Portfolio.where(:id => params[:id]).last

    if portfolio
	    Photo.where(:imageable_id => params[:id]).each do |photo|
	    	photo.destroy
	  	end
			portfolio.destroy
	  end
	  respond_to do |format|
      format.html { redirect_to admins_portfolios_path }
    end
  end

end