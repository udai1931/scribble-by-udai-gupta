# frozen_string_literal: true

json.articles @category.articles do |article|
  json.partial! "articles/article", article: article
end
json.count do
  json.partial! "articles/count", draft: Article.draft.length, published: Article.published.length
end
