# frozen_string_literal: true

FactoryBot.define do
  factory :schedule do
    status { "published" }
    execution_time { Time.current }
    association :schedulable, factory: :article
  end
end
