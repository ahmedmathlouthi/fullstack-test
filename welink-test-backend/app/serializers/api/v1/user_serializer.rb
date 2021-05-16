# frozen_string_literal: true

module Api
  module V1
    class UserSerializer < ActiveModel::Serializer
      attributes :id, :firstname, :lastname, :email, :feedbacks
    end
  end
end
