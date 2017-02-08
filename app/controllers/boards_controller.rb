class BoardsController < ApplicationController

  before_action :set_board, only: [:show, :update, :destroy]

  def index
    @boards = current_user.boards
    respond_to do |format|
      format.json { render json: @boards }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @board.to_json(include: [:lists, :users]) }
    end
  end

  def create
    @board = Board.new(board_params)
    @board.users << current_user
    if @board.save
      respond_to do |format|
        format.json { render json: @board }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @board.errors.full_messages }, status: 422 }
      end
    end
  end

  def update
    if @board.update_attributes(board_params)
      respond_to do |format|
        format.json { render json: @board }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @board.errors.full_messages }, status: 422 }
      end
    end
  end

  def destroy
    @board.delete
    respond_to do |format|
      format.json { render json: @board }
    end
  end

  private

  def board_params
    params.require(:board).permit(:title, :description)
  end

  def set_board
    @board = Board.find(params[:id])
  end

end
