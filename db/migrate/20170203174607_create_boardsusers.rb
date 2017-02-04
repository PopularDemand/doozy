class CreateBoardsusers < ActiveRecord::Migration[5.0]
  def change
    create_table :boardsusers do |t|
      t.integer :user_id
      t.integer :board_id


      t.timestamps
    end
    add_index :boardsusers, [:board_id, :user_id], unique: true
  end
end
