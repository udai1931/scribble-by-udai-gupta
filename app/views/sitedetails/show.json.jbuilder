json.details do
  json.extract! @sitedetail,
    :name
  json.status @status
end
