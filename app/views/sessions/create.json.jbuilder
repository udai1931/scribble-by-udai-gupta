# frozen_string_literal: true

json.extract! @organization,
  :auth_token
json.expiry Time.current.to_i + 10.minute.to_i
