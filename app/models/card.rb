class Card < ApplicationRecord

  belongs_to :list
  has_many :cardsusers, dependent: :destroy
  has_many :members,
    through: :cardsusers,
    source: :user

end
