# frozen_string_literal: true

module Api
  module V1
    class FeedbackSerializer < ActiveModel::Serializer
      attributes :id, :body, :user
    end
  end
end
