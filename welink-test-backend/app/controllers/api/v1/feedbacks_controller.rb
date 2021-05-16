class Api::V1::FeedbacksController < ApplicationController
  def index
    render json: paginated_feedbacks, each_serializer: Api::V1::FeedbackSerializer
  end

  def create
    if user.nil?
      render json: { message: 'user not found' }
    else
      feedback = Feedback.create(feedback_params)
      user.feedbacks << feedback
      render json: feedback, status: :ok, serializer: Api::V1::FeedbackSerializer
    end
  end

  private

  def paginated_feedbacks
    return feedbacks_selection unless pagination_items.nonzero?
    return feedbacks_selection unless pagination_index.present?

    index = pagination_index.to_i * pagination_items
    feedbacks_selection[index..(index + pagination_items)]
  end

  def feedbacks_selection
    @feedbacks_selection ||= filter_params? ? seached_feedbacks : last_feedbacks
  end

  def seached_feedbacks
    ordered_users.includes(:feedbacks).map(&:feedbacks).flatten
  end

  def ordered_users
    user_attributes = %w[firstname lastname email]
    order_criteria = %w[asc desc]
    return seached_users unless order_attribute.in? user_attributes
    return seached_users unless order.in? order_criteria

    @ordered_users ||= seached_users.order(order_attribute.to_s => order.to_sym)
  end

  def seached_users
    return all_users unless seach_params.present?

    @seached_users ||= all_users.where(firstname: seach_params)
                                .or(User.where(lastname: seach_params))
                                .or(User.where(email: seach_params))
  end

  def last_feedbacks
    @last_feedbacks ||= all_feedbacks.take(10)
  end

  def all_feedbacks
    @all_feedbacks ||= Feedback.all.order(created_at: :asc)
  end

  def all_users
    @all_users ||= User.all
  end

  def feedback
    @feedback ||= Feedback.find_by(id: params[:id])
  end

  def user
    @user ||= User.find(params[:user_id])
  end

  def feedback_params
    params.require(:feedback).permit(:body)
  end

  def filter_params?
    seach_params || order_params? || pagination_params?
  end

  def order_params?
    order && order_attribute
  end

  def pagination_params?
    pagination_index && pagination_attribute
  end

  def seach_params
    @seach_params = params[:q]
  end

  def order_attribute
    @order_attribute ||= params[:o]
  end

  def order
    @order ||= params[:d]
  end

  def pagination_index
    @pagination_index ||= params[:p]
  end

  def pagination_items
    @pagination_items ||= params[:n].to_i
  end
end
