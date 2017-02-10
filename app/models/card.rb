class Card < ApplicationRecord

  validates_presence_of :name

  belongs_to :list
  has_many :cardsusers, dependent: :destroy
  has_many :members,
    through: :cardsusers,
    source: :user

  attr_accessor :relevant_member

  def update_membership(id)
    return if !id

    member = User.find(id)
    if self.members.include?(member)
      self.members.delete(member)
    else
      self.members << member
    end
  end

  def change_list(list_id)
    return if !list_id
    puts 'asdfasdfsad'

    list = List.find(list_id)
    self.list = list if list
  end

end
