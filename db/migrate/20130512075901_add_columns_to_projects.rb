class AddColumnsToProjects < ActiveRecord::Migration
  def change
  	add_column :websites, :title, :string
  	add_column :websites, :description, :text
  	add_column :brandings, :title, :string
  	add_column :brandings, :description, :text
  end
end
