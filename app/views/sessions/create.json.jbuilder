json.extract! @details,
  :auth_token
json.expiry Time.now.to_i + 10.minute.to_i
