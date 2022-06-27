# frozen_string_literal: true
json.versions @versions do |version|
  json.extract! version,
  :article_id,
  :title,
  :body,
  :state,
  :category_id,
  :tag
end
