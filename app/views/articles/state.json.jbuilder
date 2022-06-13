json.articles do
  json.array! @articles do |article|
    json.extract! article,
      :id,
      :title,
      :description,
      :state,
      :slug
    json.created_at article.created_at.strftime("%d %b %Y")
    json.author article.author_user.name
    json.category article.category.name
  end
end
