# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    from { "/articles/#{Faker::Name.first_name}" }
    to { "/articles/#{Faker::Name.first_name}" }
  end
end
