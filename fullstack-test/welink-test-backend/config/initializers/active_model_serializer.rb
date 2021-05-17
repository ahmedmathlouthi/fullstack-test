# frozen_string_literal: true

# ActiveModelSerializers.config.adapter = ActiveModelSerializers::Adapter::CustomAdapter
ActiveModelSerializers.config.tap do |config|
    config.adapter = :json_api
    config.key_transform = :underscore
end
  