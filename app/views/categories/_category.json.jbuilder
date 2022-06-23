# frozen_string_literal: true

json.extract! category,
  :id,
  :name
json.count category.articles.count
