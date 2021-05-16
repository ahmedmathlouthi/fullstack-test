class Api::V1::UsersController < ApplicationController
  def index
    render json: users, each_serializer: Api::V1::UserSerializer
  end
end
