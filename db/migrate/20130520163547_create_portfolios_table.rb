class CreatePortfoliosTable < ActiveRecord::Migration
  def up
  	create_table :portfolios do |t|
  		t.integer :placement

      t.timestamps
  	end
  end

  def down
  	drop_table :portfolios
  end
end
