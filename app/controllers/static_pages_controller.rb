class StaticPagesController < ApplicationController

  before_action :authenticate_user!, only: [:index]

  def index
  end

  def home
  end

end
