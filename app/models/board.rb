class Board < ApplicationRecord

  validates_presence_of :title

  has_many :boardsusers, dependent: :destroy
  has_many :users, through: :boardsusers
  has_many :lists
end
