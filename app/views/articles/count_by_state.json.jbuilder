# frozen_string_literal: true
json.count do
  json.all @draft+@published
  json.draft @draft
  json.published @published
end
