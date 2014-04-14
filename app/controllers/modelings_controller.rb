class ModelingsController < ApplicationController
  def index
    @modelings = Modeling.all

    respond_to do |format|
      format.html
    end
  end

  def show
    modeling = Modeling.where(:id => params[:id]).last

    photos = []
    modeling.photos.each do |photo|
      photos << {:url => photo.image.url(:original)}
    end
    modeling = {:photos => photos}
    render :json => modeling
  end
end