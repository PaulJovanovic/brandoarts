class Admins::AttachmentsController < ApplicationController

  layout "admins"

  def show
    @attachment = Attachment.where(admin_id: current_admin.id).last
    if !@attachment
      redirect_to new_admins_attachments_path
    end
  end

  def new
    @attachment = Attachment.new
  end

  def create
    @attachment = Attachment.new(params[:attachment], admin_id: current_admin.id)
    if @attachment.save
      flash[:notice] = "Well done."
      redirect_to admins_attachments_path
    else
      flash[:notice] = "Medium well."
      render new_admins_attachment_path
    end
  end

end