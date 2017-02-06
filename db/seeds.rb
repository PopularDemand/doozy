User.destroy_all
Board.destroy_all
List.destroy_all
Card.destroy_all

NUM_USERS = 3
BOARDS_PER_USER = 3
LISTS_PER_BOARD = 3
CARDS_PER_LIST = 3

puts 'creating users'
NUM_USERS.times do |num|
  user = User.create(
    username: "foo#{num}",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: "foo#{num}@test.com",
    password: "password",
    password_confirmation: "password"
  )
end

puts 'creating boards'
User.all.each do |user|
  BOARDS_PER_USER.times do |num|
    user.boards.create(
      title: Faker::Hipster.word.capitalize
    )
  end
end

puts 'creating lists'
Board.all.each do |board|
  LISTS_PER_BOARD.times do
    board.lists.create(
      title: Faker::GameOfThrones.house
    )
  end
end

puts 'creating cards'
List.all.each do |list|
  CARDS_PER_LIST.times do
    card = list.cards.create(
      name: Faker::GameOfThrones.character,
      description: Faker::StarWars.wookie_sentence,
      priority: Faker::Number.between(1, 5)
    )
    card.members << list.board.users.first
    card.save
  end
end
