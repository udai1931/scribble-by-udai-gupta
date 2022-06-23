# frozen_string_literal: true

json.article do
  json.partial! "articles/article", article: @article
  json.category_id @article.category.id
end
