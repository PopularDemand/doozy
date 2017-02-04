class Board < ApplicationRecord
  has_many :boardsusers, dependent: :destroy
  has_many :users, through: :boardsusers
  has_many :lists
end
