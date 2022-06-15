json.categories do
  json.array! @categories do |category|
    json.extract! category,
      :name
    json.articles do
      json.array! category.articles do |article|
        json.extract! article,
          :title,
          :slug
      end
    end
  end
end
