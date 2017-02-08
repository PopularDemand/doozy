User.destroy_all
Board.destroy_all
List.destroy_all
Card.destroy_all

NUM_USERS = 6
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
      title: Faker::Hipster.word.capitalize,
      description: Faker::Hacker.say_something_smart
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
  member = User.all.sample
  board.users << member unless board.users.include? member
end

puts 'creating cards'
List.all.each do |list|
  CARDS_PER_LIST.times do
    card = list.cards.create(
      name: Faker::GameOfThrones.character,
      description: Faker::StarWars.quote,
      priority: Faker::Number.between(1, 5)
    )
    card.members = list.board.users
    card.save
  end
end
