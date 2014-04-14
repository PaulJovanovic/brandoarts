class CreateModelings < ActiveRecord::Migration
  def up
    create_table :modelings do |t|
      t.integer :placement

      t.timestamps
    end
  end

  def down
    drop_table :modelings
  end
end
