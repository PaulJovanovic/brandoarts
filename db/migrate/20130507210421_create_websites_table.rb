class CreateWebsitesTable < ActiveRecord::Migration
  def change
    create_table :websites do |t|
      t.integer :placement
      t.string :url

      t.timestamps
    end
  end
end