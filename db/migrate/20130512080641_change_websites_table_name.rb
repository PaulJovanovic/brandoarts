class ChangeWebsitesTableName < ActiveRecord::Migration
  def change
  	rename_table :websites, :webs
  end
end
