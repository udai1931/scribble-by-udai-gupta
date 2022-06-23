# frozen_string_literal: true

json.organization do
  json.extract! @organization,
    :name
  json.auth_status @_is_authentication_up
end
