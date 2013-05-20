class CreatePhotographiesTable < ActiveRecord::Migration
  def up
  	create_table :photographies do |t|
  		t.integer :placement

      t.timestamps
  	end
  end

  def down
  	drop_table :photographies
  end
end
