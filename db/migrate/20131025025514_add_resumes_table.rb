class AddResumesTable < ActiveRecord::Migration
  def up
    create_table :attachments do |t|
      t.integer :admin_id
      t.attachment :resume
      t.timestamps
    end
  end

  def down
    drop_table :attachments
  end
end
