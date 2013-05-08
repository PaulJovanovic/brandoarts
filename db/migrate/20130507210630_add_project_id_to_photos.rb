class AddProjectIdToPhotos < ActiveRecord::Migration
  def change
  	add_column :photos, :project_id, :integer
  end
end
