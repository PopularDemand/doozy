User.destroy_all
Board.destroy_all
List.destroy_all
Card.destroy_all

NUM_USERS = 6
BOARDS_PER_USER = 3
LISTS_PER_BOARD = 3
CARDS_PER_LIST = 3

BOARDS = ['A', 'B', 'C'].map { |letter| "Project #{letter}"}
LISTS = ['A', 'B', 'C'].map { |letter| "Goal #{letter}"}
CARDS = ['A', 'B', 'C'].map { |letter| "Task #{letter}"}

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
      title: BOARDS[num%3],
      description: "Exciting description for #{BOARDS[num%3]}"
    )
  end
end

puts 'creating lists'
Board.all.each do |board|
  LISTS_PER_BOARD.times do |num|
    board.lists.create(
      title: LISTS[num%3]
    )
  end
  member = User.all.sample
  board.users << member unless board.users.include? member
end

puts 'creating cards'
List.all.each do |list|
  CARDS_PER_LIST.times do |num|
    card = list.cards.create(
      name: CARDS[num%3],
      description: "Exciting description for #{CARDS[num%3]}",
      priority: Faker::Number.between(1, 5)
    )
    card.members = list.board.users
    card.save
  end
end
