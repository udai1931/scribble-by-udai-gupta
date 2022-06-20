# frozen_string_literal: true

json.articles do
  json.array! @articles do |article|
    json.extract! article,
      :id,
      :title,
      :description,
      :slug,
      :state
    json.created_at article.created_at.strftime("%d %b %Y")
    json.author article.author_user.name
    json.category article.category.name
  end
end
