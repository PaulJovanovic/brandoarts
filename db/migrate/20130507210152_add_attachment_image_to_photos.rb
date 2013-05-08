class AddAttachmentImageToPhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.attachment :image
    end
  end
end
