# frozen_string_literal: true

json.versions @versions do |version|
  json.extract! version,
    :id,
    :article_id,
    :title,
    :body,
    :state
  json.tag version["tag"]
  json.created_at version.created_at.utc.getlocal.strftime("%I:%M%p, %D")
  json.slug @slug
  json.category do
    json.label version.category.name
    json.value version.category.id
  end
end
