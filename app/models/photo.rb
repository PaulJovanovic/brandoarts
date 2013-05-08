class Photo < ActiveRecord::Base
	belongs_to :project
	attr_accessible :image, :project_id
	validates_attachment_presence :image
	has_attached_file :image, :styles => { :large => "581x300", :small => "258x180#", :thumb => "80x80#" }, :url => ":s3_domain_url", :path => "/:class/images/:id_:basename.:style.:extension"
end