json.articles do
  json.array! @articles do |article|
    json.extract! article,
      :id,
      :title,
      :description,
      :slug
  end
end
