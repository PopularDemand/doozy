class AddDescriptionToBoards < ActiveRecord::Migration[5.0]
  def change
    change_table :boards do |t|
      add_column :boards, :description, :string
    end
  end
end
