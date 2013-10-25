class Attachment < ActiveRecord::Base
  belongs_to :admin

  attr_accessible :resume

  has_attached_file :resume, :url => ":s3_domain_url", :path => "/:class/images/:id_:basename.:style.:extension"
end