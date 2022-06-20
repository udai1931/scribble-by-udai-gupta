# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    name { Faker::Lorem.sentence[0...20] }
  end
end
