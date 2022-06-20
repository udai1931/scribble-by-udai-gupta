# frozen_string_literal: true

FactoryBot.define do
  factory :site_detail do
    name { Faker::Name.name }
    password { "welcome" }
    password_confirmation { "welcome" }
  end
end
