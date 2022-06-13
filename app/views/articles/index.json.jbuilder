json.articles do
  json.array! @articles do |article|
    json.extract! article,
      :id,
      :title,
      :description,
      :slug,
      :state
    json.created_at article.created_at.strftime("%d %b %Y")
  end
end
