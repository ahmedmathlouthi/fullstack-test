FactoryBot.define do
  factory :feedback do
    association :user, factory: %i[user valid]

    trait :valid do
      body { Faker::Lorem.sentence(word_count: 3, supplemental: true) }
    end
  end
end
