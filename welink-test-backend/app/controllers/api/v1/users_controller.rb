class Api::V1::UsersController < ApplicationController
  def index
    render json: users, each_serializer: Api::V1::UserSerializer
  end

  def create
    user.update(user_params)
    feedback = Feedback.find_or_create_by(body: feedback_body)
    user.feedbacks << feedback

    if user.save
      render json: user, status: :ok, serializer: Api::V1::UserSerializer
    else
      render json: { message: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def users
    User.all
  end

  def user
    User.find_or_create_by(email: user_params[:email])
  end

  private

  def feedback_body
    params[:feedback][:body].strip
  end

  def user_params
    params.permit(:firstname, :lastname, :email)
  end
end
