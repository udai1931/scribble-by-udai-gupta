# frozen_string_literal: true

class Eui::ArticlesController < ApplicationController
  def index
    @articles = Article.published.where(
      "lower(title) LIKE :search",
      search: "%#{params[:title]}%")
  end
end
