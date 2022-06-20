# frozen_string_literal: true

json.redirections do
  json.array! @redirections do |redirection|
    json.extract! redirection,
      :from,
      :to,
      :id
  end
end
