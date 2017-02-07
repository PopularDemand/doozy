class ListsController < ApplicationController

  before_action :set_list, only: [:update, :destroy]

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

  def update
    if @list.update_attributes(list_params)
      respond_to do |format|
        format.json { render json: @list }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @list.errors.full_messages }, status: 422 }
      end
    end
  end

  def destroy
    @list.delete
    respond_to do |format|
      format.json { render json: @list }
    end
  end

  private

  def set_list
    @list = List.find(params[:id])
  end

  def list_params
    params.require(:list).permit(:title)
  end

end
