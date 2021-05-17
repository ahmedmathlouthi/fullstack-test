FactoryBot.define do
  factory :user do
    trait :valid do
      firstname { Faker::Name.first_name }
      lastname { Faker::Name.last_name }
      email { Faker::Internet.email }
    end

    trait :invalid do
      firstname { '' }
      lastname { Faker::Name.last_name }
      email { Faker::Internet.email }
    end
  end
end
