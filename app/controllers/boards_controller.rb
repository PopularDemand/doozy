class BoardsController < ApplicationController

  def index
    @boards = current_user.boards
    respond_to do |format|
      format.json { render json: @boards }
    end
  end

  def show
    @board = Board.find(params[:id])
    respond_to do |format|
      format.json { render json: @board }
    end
  end

  def create
    @board = current_user.boards.build(board_params)
    if @board.save
      respond_to do |format|
        format.json { render json: @board }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @board.errors.full_messages } }
      end
    end
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end

end
