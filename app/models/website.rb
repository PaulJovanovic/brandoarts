class Website < ActiveRecord::Base
	default_scope order('placement ASC')
	attr_accessible :photos_attributes, :description, :title, :photos, :url
	has_many :photos, :as => :imageable
	accepts_nested_attributes_for :photos, :allow_destroy => true
	attr_accessor :placement
end