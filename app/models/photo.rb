class Photo < ActiveRecord::Base
	belongs_to :imageable, :polymorphic => true
	attr_accessible :image, :project_id, :background_color, :imageable_id
	validates_attachment_presence :image
	has_attached_file :image, :styles => { :large => "571x381#", :small => "238x159#", :thumb => "119x80#" }, :url => ":s3_domain_url", :path => "/:class/images/:id_:basename.:style.:extension"
end