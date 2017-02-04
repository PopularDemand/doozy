class Card < ApplicationRecord

  belongs_to :list
  has_many :cardsusers, dependent: :destroy
  has_many :users, through: :cardsusers

end
