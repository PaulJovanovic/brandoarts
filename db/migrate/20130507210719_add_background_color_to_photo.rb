class AddBackgroundColorToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :background_color, :string
  end
end
