class Project < ActiveRecord::Base
	attr_accessible :photos_attributes, :description, :title, :photos
	has_many :photos
	accepts_nested_attributes_for :photos, :allow_destroy => true
end
