# frozen_string_literal: true

json.category do
  json.partial! "categories/category", category: @category
end
