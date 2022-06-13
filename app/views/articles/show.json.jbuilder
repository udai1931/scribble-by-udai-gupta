json.article do
  json.extract! @article,
    :id,
    :title,
    :description,
    :state,
    :slug
  json.created_at @article.created_at.strftime("%d %b %Y")
end
