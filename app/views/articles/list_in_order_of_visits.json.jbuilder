# frozen_string_literal: true

json.articles @articles do |article|
  json.partial! "articles/article", article: article
end
json.count Article.all.count
