class Modeling < ActiveRecord::Base
  default_scope order('placement ASC')
  attr_accessible :photos_attributes, :description, :title, :photos
  has_many :photos, :as => :imageable
  accepts_nested_attributes_for :photos, :allow_destroy => true
end