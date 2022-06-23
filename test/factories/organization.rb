# frozen_string_literal: true

FactoryBot.define do
  factory :organization do
    name { Faker::Name.name }
    password { "welcome" }
    password_confirmation { "welcome" }
    is_password_protected { true }
  end
end
