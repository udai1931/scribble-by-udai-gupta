# frozen_string_literal: true

FactoryBot.define do
  factory :site_detail do
    name { Faker::Name.name }
  end
end
