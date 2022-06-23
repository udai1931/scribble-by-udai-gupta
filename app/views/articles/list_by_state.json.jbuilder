# frozen_string_literal: true

json.articles @articles do |article|
  json.partial! "articles/article", article: article
end
json.count do
  json.partial! "articles/count", draft: @draft, published: @published
end
