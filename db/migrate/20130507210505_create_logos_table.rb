class CreateLogosTable < ActiveRecord::Migration
  def change
    create_table :logos do |t|
      t.integer :placement

      t.timestamps
    end
  end
end
