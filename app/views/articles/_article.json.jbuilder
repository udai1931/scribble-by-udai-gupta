# frozen_string_literal: true

json.extract! article,
  :id,
  :title,
  :body,
  :state,
  :slug
json.created_at article.created_at.strftime("%d %b %Y")
json.user article.user.name
json.category article.category.name
