# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    user
    category
    title { Faker::Lorem.sentence[0...49] }
    body { Faker::Lorem.sentence[0...249] }
  end
end
