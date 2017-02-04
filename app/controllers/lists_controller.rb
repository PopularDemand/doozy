class ListsController < ApplicationController

  def index
    @board = Board.find(params[:board_id])
    @lists = @board.lists
    respond_to do |format|
      format.json { render json: @lists }
    end
  end

  def create
    @board = Board.find(params[:board_id])
    @list = @board.lists.build(list_params)
    if @list.save
      respond_to do |format|
        format.json { render json: @list }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @list.errors.full_messages } }
      end
    end
  end

  private

  def list_params
    params.require(:list).permit(:title)
  end

end
