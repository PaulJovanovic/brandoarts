class Admins::ModelingsController < ApplicationController

  before_filter :authenticate_admin!

  layout "admins"

  def index
    @modelings = Modeling.all

    respond_to do |format|
      format.html
    end
  end

  def new
    @modeling = Modeling.new
    @modeling.photos.build

    respond_to do |format|
      format.html
    end
  end

  def create
    @modeling = Modeling.new(params[:modeling])
    @modeling.placement = Modeling.count

    if @modeling.save
      respond_to do |format|
        format.html  { redirect_to(admins_modeling_path(@modeling),
                      :notice => 'Photo was successfully created.') }
      end
    else
      redirect_to new_admins_modeling_path
    end
  end

  def show
    @modeling = Modeling.where(:id => params[:id]).last

    if @modeling
      respond_to do |format|
        format.html
      end
    else
      redirect_to admins_modelings_path
    end

  end

  def edit
    @modeling = Modeling.where(:id => params[:id]).last
  end

  def update
    @modeling = Modeling.where(:id => params[:id]).last

    respond_to do |format|
      if @modeling.update_attributes(params[:modeling])
        format.html { redirect_to admins_modelings_path, notice: 'Photo was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end

  def destroy
    modeling = Modeling.where(:id => params[:id]).last

    if modeling
      modeling.photos.each do |photo|
        photo.destroy
      end
      modeling.destroy
    end
    respond_to do |format|
      format.html { redirect_to admins_modelings_path }
    end
  end

end