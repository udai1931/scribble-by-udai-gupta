json.categories do
  json.array! @categories do |category|
    json.extract! category,
      :name,
      :count,
      :id
  end
end
