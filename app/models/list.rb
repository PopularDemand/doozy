class List < ApplicationRecord

  validates_presence_of :title

  belongs_to :board
  has_many :cards
  has_many :members, through: :board,
    source: :users
end
