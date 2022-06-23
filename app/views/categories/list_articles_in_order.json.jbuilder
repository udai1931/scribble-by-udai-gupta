# frozen_string_literal: true

json.categories @categories do |category|
  json.partial! "categories/category", category: category
  json.articles category.articles do |article|
    json.extract! article,
      :title,
      :slug
  end
end