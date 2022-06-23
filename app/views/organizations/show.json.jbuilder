# frozen_string_literal: true

json.organization do
  json.extract! @organization,
    :name,
    :is_password_protected
end
