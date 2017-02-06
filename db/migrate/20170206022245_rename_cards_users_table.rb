class RenameCardsUsersTable < ActiveRecord::Migration[5.0]
  def change
    rename_table :cards_users, :cardsusers
  end
end
