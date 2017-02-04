class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :username, :first_name, :last_name

  has_many :boardsusers, dependent: :destroy
  has_many :boards, through: :boardsusers
  has_many :cardsusers, dependent: :destroy
  has_many :cards, through: :cardsusers

end
