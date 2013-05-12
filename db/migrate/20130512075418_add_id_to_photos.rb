class AddIdToPhotos < ActiveRecord::Migration
  def change
  	add_column :photos, :imageable_id, :integer
  	add_column :photos, :imageable_type, :string
  	remove_column :photos, :project_id
  end
end
