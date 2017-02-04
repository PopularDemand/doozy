class CardsController < ApplicationController

  def index
    @list = List.find(params[:list_id])
    @cards = @list.cards
    respond_to do |format|
      format.json { render json: @cards }
    end
  end

  def create
    @list = List.find(params[:list_id])
    @card = @list.cards.build(card_params)
    if @card.save
      respond_to do |format|
        format.json { render json: @card }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @card.errors.full_messages } }
      end
    end
  end

  private

  def card_params
    params.require(:card).permit(:name, :description, :priority, :completed)
  end
end
