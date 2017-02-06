class Card < ApplicationRecord

  validates_presence_of :name

  belongs_to :list
  has_many :cardsusers, dependent: :destroy
  has_many :members,
    through: :cardsusers,
    source: :user

end
