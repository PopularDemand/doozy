class CardsController < ApplicationController

  before_action :set_card, only: [:update, :destroy]

  def index
    @list = List.find(params[:list_id])
    @cards = @list.cards
    respond_to do |format|
      format.json { render json: @cards.to_json(include: [:members, {list: { only: [:title], include: :members }} ]) }
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

  def update
    
    @card.update_membership(params[:relevant_member])
    @card.change_list(params[:list_id])
    if @card.update_attributes(card_params)
      respond_to do |format|
        format.json { render json: @card }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @card.errors.full_messages }, status: 422 }
      end
    end
  end

  def destroy
    @card.delete
    respond_to do |format|
      format.json { render json: @card }
    end
  end

  private

  def card_params
    params.require(:card).permit(:name, :description, :priority, :completed, :relevant_member, :list_id)
  end

  def set_card
    @card = Card.find(params[:id])
  end
end
