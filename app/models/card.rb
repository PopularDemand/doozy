class Card < ApplicationRecord

  validates_presence_of :name

  belongs_to :list
  has_many :cardsusers, dependent: :destroy
  has_many :members,
    through: :cardsusers,
    source: :user

  def update_membership(id)
    return if !id
    puts 'adfkajsdfjasldfjalskjdf;lajksdf;jas;dlfj'
    member = User.find(id)
    if self.members.include?(member)
      self.members.delete(member)
    else
      self.members << member
    end
  end

end
